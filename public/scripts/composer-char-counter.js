$(document).ready(function() {
  // Declaring variables
  const $tweetText = $('#tweet-text');
  const $counter = $('#counter');
  let counter = 140;
  $counter.text(counter);

  // Changes the counter on each keydown press
  $($tweetText).on('keydown', function(event) {
    counter = $tweetText.val().length;
    $counter.text(140 - counter);
    
    //changes color depending on value
    if (counter > 140){
      $counter.css('color', 'red');
    } else {
      $counter.css('color', '#545149');
    }
  });
});