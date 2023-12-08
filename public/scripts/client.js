/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const timeagoInstance = timeago();
// import { format, render, cancel, register } from 'timeago.js';

const timeagoInstance = timeago();

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const objectData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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

const loadTweets = (data) => {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    // data: $(this).serialize()
  }).then(renderTweets).catch((err) => console.log(err));
}


$(document).ready(function () {

  // renderTweets(objectData);

  $('#form').on('submit', function (event) {
    const $textarea = $('#tweet-text');
    const $errorMessage = $('#errorMessage');
    const $counter = $('#counter');

    event.preventDefault();

    if ($textarea.val().length >= 140) {
      $errorMessage.text("Error: You must not exceed the character limit!");
    } else if ($textarea.val() === '' || $textarea.val() === null) {
      $errorMessage.text("Error: Your text is empty!");
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize()
      }).then(loadTweets)
        .catch((err) => console.log(err));
        $counter.text('140')
      $textarea.val('');
      $errorMessage.text('');
    }
  });

  loadTweets();

});