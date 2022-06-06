
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern=[];
var isStarted=false;
var level=0;

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern);
});

$(document).keypress(function(){
  if(!isStarted){
    isStarted=true;
    setTimeout(function(){
      nextSequence();
    },500);
    gamePattern = [];
    $("h1").html("Level "+level);
  }
  
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
    console.log("sucess");
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },400);
    $("h1").html("Game Over, Press Any Key to Restart");
    level=0;
    isStarted=false;
  }
  
}

function playSound(input){
  var audio = new Audio("sounds"+"/"+input+".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").html("Level "+level);
  
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}