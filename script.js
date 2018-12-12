var gameLetters = ['q', 'w', 'e', 'i', 'o', 'p'];
var curLetter = [];
var m = 0;
var score = 0;
var timer = 60;

var endGamePage = function() {
    var totalscore = 0;

    document.querySelector("#ticking-audio").pause();
    document.querySelector("#ticking-audio").currentTime = 0;
    document.querySelector("#thriller-audio").pause();
    document.querySelector("#thriller-audio").currentTime = 0;

    //removes the play game Nodes/Elements
    var playNodes = document.querySelector("#play-container");
    playNodes.parentNode.removeChild(playNodes);
    //create end page container
    var endPage = document.createElement("div");
    setAttributes(endPage,{"id": "end-page"});
    document.querySelector("#container").appendChild(endPage);
    //create game over page Title
    var gameOverTitle = document.createElement("h1");
    setAttributes(gameOverTitle, {"id":"game-over"});
    gameOverTitle.textContent = "game over";
    document.querySelector("#end-page").appendChild(gameOverTitle);
    //create completion time tag
    var endTimer = document.createElement("h2");
    setAttributes(endTimer,{"id": "end-timer"});
    endTimer.textContent = "completed in: " + (timer = 60 - timer) + " secs";
    document.querySelector("#end-page").appendChild(endTimer);
    //condition for bonus pts
     if (timer >= 41 && timer <=58) {
        var bonus = 20;
        totalscore = score + bonus;
    } else if(timer >=31 && timer <= 40) {
        var bonus = 60;
        totalscore = score + bonus;
    } else if (timer <= 30){
        var bonus = 100;
        totalscore = score + bonus;
    } else {
        var bonus = 0;
        totalscore = score;
    };
    //create game score
    var gameScore = document.createElement("h2");
    setAttributes(gameScore,{"id":"game-score"});
    gameScore.textContent = "game score: " + score + " pts";
    document.querySelector("#end-page").appendChild(gameScore);
    //create bonus score
    var bonusScore = document.createElement("h2");
    setAttributes(bonusScore,{"id":"bonus-score"});
    bonusScore.textContent = "bonus score: " + bonus;
    document.querySelector("#end-page").appendChild(bonusScore);
    //create completion end score
    var endScore = document.createElement("h2");
    setAttributes(endScore,{"id":"end-score"});
    endScore.textContent = "total score: " + totalscore  +" pts";
    document.querySelector("#end-page").appendChild(endScore);
    //create play again button
    var replayBtn = document.createElement("button");
    setAttributes(replayBtn, {"id": "replay-btn"});
    replayBtn.textContent = "play again";
    document.querySelector("#end-page").appendChild(replayBtn);
    //play again button click event
    //delete the end game page Nodes
    // timer reset to 60secs and score to 0
    //create playArea
    document.querySelector("#replay-btn").
        addEventListener("click", function(){
            var gameOverNodes = document.querySelector("#end-page");
            gameOverNodes.parentNode.removeChild(gameOverNodes);
            timer = 60;
            score = 0;
            createPlayArea();
        });
}

var createPlayArea = function(){
    //create play area container
    var playContainer = document.createElement("div");
    setAttributes(playContainer, {"id": "play-container"});
    document.querySelector("#container").appendChild(playContainer);
    //create the play area header
    var playTitle = document.createElement("h1");
    setAttributes(playTitle,{"class": "center-txt"});
    playTitle.textContent="be fast and focused!!!";
    document.querySelector("#play-container").appendChild(playTitle);
    //create score box
    var scoreBox = document.createElement("h2");
    setAttributes(scoreBox,{"id": "score", "class": "score-time"});
    scoreBox.textContent = "Score: " + score;
    document.querySelector("#play-container").appendChild(scoreBox);
    //create the 8 tiles
    for (i=0; i < 8; i++) {
        var tiles = document.createElement("div");
        setAttributes(tiles,{"class": "game-tiles"});
        tiles.textContent = "";
        document.querySelector("#play-container").appendChild(tiles);
    };
    //create player input header
    var inputTitle = document.createElement("h3");
    setAttributes(inputTitle, {"id": "input-title"});
    inputTitle.textContent = "player input";
    document.querySelector("#play-container").appendChild(inputTitle);
    //create box for player's input
    var playerKey = document.createElement("div");
    setAttributes(playerKey,{"id":"player-input"});
    playerKey.textContent = "_";
    document.querySelector("#play-container").appendChild(playerKey);
    //create timer box
    var timerBox = document.createElement("h2");
    setAttributes(timerBox,{"id": "timer-box","class":"score-time"});
    timerBox.textContent = "Timer: " + timer;
    document.querySelector("#play-container").appendChild(timerBox);
    //timer countdown 60 secs display every 1 sec
    //every 1 sec timer decrement by 1
    //update timer and score every 1 sec
    //if timer <= 0 go to end game page, clearInterval for countdown
    // else if score === 100 go to end game, clearInterval for countdown,
    var countdown = setInterval(function(){
    timer --;
    document.querySelector("#ticking-audio").play();
    document.querySelector("#timer-box").textContent = "Timer: " + timer;

        if (timer <= 0 ){
            clearInterval(countdown);
            endGamePage();
        } else if (score === 100){
            clearInterval(countdown);
            endGamePage();
        } else if(timer <= 30) {
            document.querySelector("#thriller-audio").play();
        }

    },1000)
    randomize()
};

var randomize = function() {
    //get all 8 game-tiles element by class name
    //generate random num
    //letter will be an alphabet from gameletter [random index]
    //push letter in curLetter array.
    //repeat for 8 times
    var gameTiles = document.getElementsByClassName("game-tiles");
        for (j=0; j<8; j++) {
            var random = Math.floor(Math.random() * 6);
            var letter = gameLetters[random];
            curLetter.push(letter);
                //letter will be k index of curLetter
                //textContent of current gameTiles will take the letter
                for (k=0; k < gameTiles.length;k++) {
                    var letter = curLetter[k];
                    gameTiles[k].textContent = letter;
                };
        };
};

document.addEventListener('keydown', (event) => {
    gamePlay(event) });


var gamePlay = function (input) {
    var keyName = input.key;
    //display the player's input
    document.querySelector("#player-input").textContent = keyName;
            //console.log(keyName);
           if(curLetter[m] === keyName) {
                //console.log("true");
                document.querySelectorAll(".game-tiles")[m].style.backgroundColor = "#00BFFF";

                m++;
           } else if (curLetter[m] !== keyName) {
                document.querySelector("#error-audio").play();
           };

           if (m === 8) {
                document.querySelector("#ding-audio").play();
                score += 10;
                m = 0;
                document.querySelector("#score").textContent = "Score: " + score;
                emptyTiles();
           };
}

var emptyTiles = function () {
    var gameTiles = document.querySelectorAll(".game-tiles")
    //set the tiles of white background
    for(q=0; q < gameTiles.length; q++) {
        gameTiles[q].style.backgroundColor = "white";
        gameTiles[q].textContent = "_";
    }
    //empty the variable array
    curLetter = [];
    randomize();
}


//set attributes function (for multiple names)
function setAttributes(element, attribute) {
  for(var key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

//click start go to createPlayArea function
window.onload = function(){
    document.querySelector("#startbtn").
        addEventListener("click", function(){
            var introNodes = document.querySelector("#intro");
            introNodes.parentNode.removeChild(introNodes);

            createPlayArea();
        })
}