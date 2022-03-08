// Global variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//utility functions
buttonAnimation = (color) => {
    $("#"+color).fadeOut(100).fadeIn(100);
}

buttonAnimatePress = (color) => {
    $('#' + color).addClass("pressed");
    setTimeout(function (){
        $("#"+ color).removeClass("pressed");
    },50);
}

buttonSound = (color) => {
    switch(color) {
        case "red":
        case "blue":
        case "green":
        case "yellow":
            audio = new Audio("sounds/"+color+".mp3");
            audio.play();
            break;
        default:
            audio = new Audio("sounds/wrong.mp3");
            audio.play();
    }
}

//functionality
nextSequence = () => {
    let randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];

    level++;
    $("h1").text("Level "+ level);
    gamePattern.push(randomChosenColour);
    buttonAnimation(randomChosenColour);
    buttonSound(randomChosenColour);
}

gameOver = () => {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;

    $("body").addClass("game-over");
    buttonSound("wrong");
    setTimeout(function (){
        $("body").removeClass("game-over");
        $("h1").text("Game Over, press anywhere to start again!");
        $(".btn").off("click", checkAnswer);
        $(document).one("click", startGame);
    },50); 
}

continueGame = (userChosenColor) => {
    buttonAnimatePress(userChosenColor);
    buttonSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    if(gamePattern.length === userClickedPattern.length)
        setTimeout(function() {
            userClickedPattern = [];
            nextSequence();
        }, 1500);
}

checkAnswer = (e) => {
    let userChosenColor = e.target.id;
    
    if(userChosenColor !== gamePattern[userClickedPattern.length]) {
        gameOver();
    } else {
       continueGame(userChosenColor);
    }
}

startGame = () => {
    nextSequence();
    $(".btn").on("click", checkAnswer);
}

//initial handlers
$(document).one("click", startGame);

