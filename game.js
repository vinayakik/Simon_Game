
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
started = false;
// Create a new variable called level and start at level 0.
var level = 0;

//jQuery to detect when a keyboard key has been pressed
$("#startBtn").click(function () {
    if (!started) {
        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0"
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
        $("#startBtn").css("visibility","hidden"); //once user click on strt. Buttonn will be hidden until game over
    }
});

function nextSequence() {
    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    // Inside nextSequence(), update the h1 with the value of level.
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); //create random number between 0 to 3
    var randomChosenColour = buttonColours[randomNumber]; //pick any randomm color in a given color array
    gamePattern.push(randomChosenColour);   //add randomly chosen color to gamePattern array

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //box effects when it is clicked

    playSound(randomChosenColour); //call the playSound function by passing the color of the box/button
    animatePress(randomChosenColour); // call animation class after pressign the box/button

}

function userInput(clickedButton) {  //this function is called when user click on button. it will get button color as parameter
    var userChosenColour = clickedButton; //storing the color name in userChosenColor
    userClickedPattern.push(userChosenColour); //adding the color into userClickedPattern array

    playSound(clickedButton);  //call the playSound function by passing the color of the box/button
    animatePress(clickedButton); // call animation class after pressign the box/button

    checkAnswer(userClickedPattern.length-1); //calling checkAnswer function by passing the index of last element in the array
}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success")
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(nextSequence,1000);
            userClickedPattern=[];
        

        }
    }
    else{
        console.log("wrong")
        playSound("wrong");
        $(document.body).addClass("game-over");
        setTimeout(function(){
        $(document.body).removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Click on Restart");
        $("#startBtn").text("Restart")
        $("#startBtn").css("visibility","visible"); //make button visible once game over

        startOver()
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}


function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;

}