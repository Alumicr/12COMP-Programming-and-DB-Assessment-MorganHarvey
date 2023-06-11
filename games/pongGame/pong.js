//  start of code 
// vars
var gameOver_pong = false;
var highScoreTitle_pong = "HIGHSCORES";
var timerStart = false;
var gameStarted = false;
// lets
let score_pong = 0;
let paddleSpeedUp = -8;
let paddleSpeedDown = 8;
let timer_pong = 3;
let startTimerInterval;
let intervalTimer2;

// main code
function setup() {
  if (gameOver_pong == false) {
    // creats canvas and ball
    cnv = new Canvas(windowWidth, windowHeight - 10);
    ball = new Sprite(width - 50, height / 2, 50, "d");
    // asigns properties
    ball.color = color("white");
    ball.bounciness = 1;
    ball.friction = 0;
    ball.drag = 0;
    // groups
    wallGroup = new Group();

    // makes the paddle
    paddle = new Sprite(200, 500, 10, 90, 'k');
    paddle.color = color("white");
    paddle.vel.y = 0;

    walls();
    // interval timers
    startTimerInterval = setInterval(pre_game, 1000);
    ball.collide(paddle, increaseScore);

    // paddle movement
    // up movement
    document.addEventListener("keydown", function(event) {
      if (event.code == 'ArrowUp' || event.code == "KeyW") {
        paddle.vel.y = paddleSpeedUp;
      }
      //down movment
      else if (event.code == 'ArrowDown' || event.code == "KeyS") {
        paddle.vel.y = paddleSpeedDown;
      }
    })

    // stops movement
    document.addEventListener("keyup", function(event) {
      if (event.code === 'ArrowUp' || event.code == "KeyS" || event.code == "KeyW" || event.code == 'ArrowDown') {
        paddle.vel.y = 0;
      }
    })
  }
}

function walls() {
  // Function creates walls and asigns properties
  wallRH = new Sprite(width, height / 2, 8, height, 'k');
  wallRH.color = color('white');
  wallRH.bounciness = 1;
  wallLH = new Sprite(0, height / 2, 8, height, 'k');
  wallLH.color = color('red');
  wallTop = new Sprite(width / 2, 0, width, 8, 'k');
  wallTop.color = color('white');
  wallBot = new Sprite(width / 2, height + 4, width * 2, 8, 'k');
  wallBot.color = color('white');
  // adds to group
  wallGroup.add(wallRH);
  wallGroup.add(wallLH);
  wallGroup.add(wallTop);
  wallGroup.add(wallBot);
}

//pre_game configerations
function pre_game() {
  if (gameStarted == false) {
    timer_pong -= 1;
  }
  if (timer_pong <= 0 && gameStarted == false) {
    // calls function
    gameStarter();
    // gives ball movement properties
    ball.vel.x = -5;
    ball.vel.y = 8;
  }
}


//players score
function increaseScore() {
  score_pong++;
  console.log("players score is " + score_pong);

  //starts timer 
  timerStart = true;

}
// starts timer 
function gameStarter() {
  gameStarted = true;
  if (gameOver_pong == false) {
    intervalTimer2 = setInterval(gameTimer, 1000);
  }
}
// game timer
function gameTimer() {
  if (gameOver_pong == false && timerStart == true) {
    //adds to timer
    timer_pong += 1;
  }
}

// BUTTON FUNCTIONS

function buttonDisplay_pong() {
  // displays buttons
  // reset button
  button_pong = createButton('Play again!');
  button_pong.position(width / 4, 300);
  button_pong.mousePressed(restartGame_pong);
  // return to game page button
  button2_pong = createButton('Return to home page!');
  button2_pong.position(width / 4 + 150, 300);
  button2_pong.mousePressed(SendPlayerBack_pong);

  function restartGame_pong() {
    // rechecks users highscore 
    fb_readHighScore2();
    console.log("RESTARTING GAME");
    // if reset button clicked resets
    button_pong.remove();
    button2_pong.remove();
    ball.remove();
    paddle.remove();
    // clears intervals
    clearInterval(startTimerInterval);
    clearInterval(intervalTimer2);
    // resets values
    gameOver_pong = false;
    timerStart = false;
    gameStarted = false;
    score_pong = 0;
    paddleSpeedUp = -8;
    paddleSpeedDown = 8;
    timer_pong = 3;
    //re-loops game and calls setup
    loop();
    setup();
    // rechecks players score 
    fb_readHighScore2();
    fb_highScoresTableReader();
  }

  // if return to game home button clicked sends user back to home page
  function SendPlayerBack_pong() {
    console.log("Sending user to game Page");
    window.location = "/../gameHomePage.html";
  }
}

// draw function
function draw() {
  // background color
  background("black");
  // checks if ball collies with left wall and stops game
  if (ball.collide(wallGroup)) {
    if (ball.collide(wallLH)) {
      //game over text
      console.log("game over");
      textSize(30);
      ball.color = color("red");
      fill("red");
      if (fireBasePongHighScore < score_pong) {
        text("Game over! You got a score of: " + score_pong + "!\nThe game lasted " + timer_pong + " seconds!\nYou have a new Highscore!", width / 4, 200);
      }
      else {
        text("Game over! You got a score of: " + score_pong + "!\nThe game lasted " + timer_pong + " seconds!", width / 4, 200);
      }
      buttonDisplay_pong();
      checkIfHighScoreGreater2();
      gameOver_pong = true;
      noLoop();
    }
  }

  // makes game harder when score reaches an amount
  if (score_pong == 3) {
    wallRH.bounciness = 1.2;
  }
  if (score_pong == 8) {
    wallRH.bounciness = 1.5;
    paddleSpeedDown = 10;
    paddleSpeedUp = -10;
  }

  //displays score text
  textSize(25);
  fill('white');
  text("Score: " + score_pong, 20, 42);
  //displays users highscore if greater than 0
  if (fireBasePongHighScore > 0) {
    text("HighScore: " + fireBasePongHighScore, 20, 73)
  }

  // HIGHSCORE TABLE
  for (i = firebasePongHighScoreTable.length - 1; i >= 0; i--) {
    // title
    text(highScoreTitle_pong, 20, 130);
    // flips array 
    let valueFlip_pong = firebasePongHighScoreTable.length - i - 1;
    // displays highscore table
    text(firebasePongHighScoreTable[i], 20, 160 + 30 * valueFlip_pong);
  }

  //timer text
  textSize(50);
  fill('white');
  text(timer_pong, width - 65, 60);
}

// end of code
