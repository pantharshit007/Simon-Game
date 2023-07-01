var userClickedPattern = [];
var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var score = 0;
var maxLevelReached = 0;


// $(".btn").click(function() {
//     var userChosenColour = $(this).attr("id"); }
$(".btn").on("click", function(e) {
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1); 
    //index of last element

});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var random = Math.random();
    var randomNumber = Math.floor(random * 4);

    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);

    // Update the maxLevelReached if the current level is higher
    if (level > maxLevelReached) {
        maxLevelReached = level;
        updateScore(maxLevelReached);
    }
};

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();   
};

$(this).keypress(function(){
    if (gamePattern!== 'undefined' && gamePattern.length ===0) {

        $("#level-title").text("Level "+level); 
        nextSequence();
       }
})

function startOver(){
    gamePattern = [];
    level = 0;
    userClickedPattern=[];
}

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        {
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
        }

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function updateScore(newScore) {
    score = newScore;
    $("#score").text("Score: " + score);
}

