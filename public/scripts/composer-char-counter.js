$(document).ready(function() {
  
  const $tweetText = $('#tweet-text');
  const $counter = $('#counter');
  let counter = 140;
  $counter.text(counter);
  $($tweetText).on('keydown', function(event) {
    counter = $tweetText.val().length;
    $counter.text(140 - counter);
    // console.log(counter);
    // console.log('Key pressed:', event.key);
  });
});