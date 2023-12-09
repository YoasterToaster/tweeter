$(document).ready(function() {
  // Declaring variables
  const $tweetText = $('#tweet-text');
  const $counter = $('#counter');
  let counter = 140;
  $counter.text(counter);

  // Changes the counter on each keydown press
  $($tweetText).on('input', function(event) {
    counter = $tweetText.val().length;
    $counter.text(140 - counter);

    //changes color depending on value
    if (counter > 140){
      $counter.addClass("counter-red");
    } else {
      $counter.removeClass("counter-red");
    }
  });
});