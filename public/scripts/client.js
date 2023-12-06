/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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

const data = [
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = (tweets) =>{
  // $($button).on('click', function(event) {
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
        <p>${tweets.created_at} days ago</p>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
    </section>`);
    // event.preventDefault();
  // });
  return tweetText;
}



const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets){
    const html = createTweetElement(tweet);
    $('#art').append(html);
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}
$(document).ready(function() {

  renderTweets(data);
  const $button = $('#btn');

});