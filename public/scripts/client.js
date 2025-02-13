//Imports
const timeagoInstance = timeago();

// Creates a tweet with all the html it needs
const createTweetElement = (tweets) => {
  const tweetText = $(`    <section class="tweet-container">
      <div class="tweet-header">
        <div class="top-left-tweet">
          <img src="${tweets.user.avatars}"></i>
          <p>${tweets.user.name}</p>
        </div>
        <div class="top-right-tweet">
          <a href="">
            <p>${tweets.user.handle}</p>
          </a>
        </div>
      </div>
      <p class="finished-tweet-text">${tweets.content.text}</p>
      <div class="tweet-footer">
        <p>${timeagoInstance.format(tweets.created_at)}</p>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
    </section>`);
  return tweetText;
}


// Renders the tweets
const renderTweets = function (tweets) {
  // Empty the article so that we don't duplicate when we produce the updated list of posts
  $('#art').empty();
  // So that the newest message is always on top
  const reversedArray = Array.from(tweets).reverse();

  // loops through tweets
  for (const tweet of reversedArray) {
    const html = createTweetElement(tweet);
    $('#art').append(html);
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}
// loads the tweets
const loadTweets = (data) => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
  }).then(renderTweets).catch((err) => console.log(err));
}

// Function for XSS prevention
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


$(document).ready(function () {

  $('#form').on('submit', function (event) {
    // Declaring variables
    event.preventDefault();
    const $textarea = $('#tweet-text');
    const $errorMessage = $('#errorMessage');
    const $counter = $('#counter');

    // Cross-Site Scripting
    $textarea.val(escape($textarea.val()));

    // Edge cases
    if ($textarea.val().length >= 141) {

      $errorMessage.text("Error: You must not exceed the character limit!");

    } else if ($textarea.val() === '' || $textarea.val() === null) {

      $errorMessage.text("Error: Your text is empty!");

    } else {
      // Sends data
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).then(loadTweets)
        .catch((err) => console.log(err));

      // Resets values
      $counter.text('140')
      $textarea.val('');
      $errorMessage.text('');
    }
  });
  // Loads tweets on page load
  loadTweets();

});