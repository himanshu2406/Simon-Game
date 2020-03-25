
buttonColors = ["red", "blue", "green", "yellow"];
gamepattern = [];
userClickedPattern = [];
var gamestarted = 0;
var level = 0;

$("body").keypress(function() {

  if (gamestarted === 0) {

    gamestarted = 1;
    nextSequence();

  }
});

function checkAnswer(index){
  if (userClickedPattern[index] === gamepattern[index]) {
      if (userClickedPattern.length === gamepattern.length){
        console.log('good');
      setTimeout(function() {
           nextSequence();
       }, 1000);
     }
  }else {
    if (gamestarted !== 0){
      lose();
    }
  }
}


$('.btn').on('click',function(){

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);

})

function lose(){
  $('#level-title').text('Game Over ! Press any key to restart !');
  $('body').addClass('game-over');
  setTimeout(function() {
       $('body').removeClass('game-over');
   }, 100);
   gamepattern = [];
   gamestarted = 0;
   level = 0;

}


function nextSequence(){

  userClickedPattern = []
  level += 1;
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColors[randomNumber];
  gamepattern.push(randomColor);
  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);

}

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(button){

  $('#'+ button).addClass('pressed');
  setTimeout(function() {
       $('#'+ button).removeClass('pressed');
   }, 100);

}
