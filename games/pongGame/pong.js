//  start of code 
// vars
var gameOver_pong = false;
var timerStart = false;
var gameStarted = false;
// firebase vars
var fireBasePongHighScore;
// lets
let score_pong = 0;
let paddleSpeedUp = -8;
let fb_data;
let paddleSpeedDown = 8;
let timer_pong = 3;

let intervalTimer;
let intervalTimer2;

// main code
function setup() {
  if (gameOver_pong == false) {
    highScoreReader();
    // creats canvas and ball
    cnv = new Canvas(windowWidth, windowHeight - 10);
    ball = new Sprite(width - 50, height / 2, 50, "d");
    ball.color = color("white");
    ball.bounciness = 1;
    ball.friction = 0;
    ball.drag = 0;
    wallGroup = new Group();
    // makes the paddle
    paddle = new Sprite(200, 500, 10, 90, 'k');
    paddle.color = color("white");
    paddle.vel.y = 0;


    walls();
    intervalTimer = setInterval(pre_game, 1000);
    ball.collide(paddle, increaseScore);


    // paddle movement
    document.addEventListener("keydown", function(event) {
      if (event.code == 'ArrowUp' || event.code == "KeyW") {
        paddle.vel.y = paddleSpeedUp;
      }
      else if (event.code == 'ArrowDown' || event.code == "KeyS") {
        paddle.vel.y = paddleSpeedDown;
      }
    })

    document.addEventListener("keyup", function(event) {
      if (event.code === 'ArrowUp' || event.code == "KeyS" || event.code == "KeyW" || event.code == 'ArrowDown') {
        paddle.vel.y = 0;
      }
    })
  }
}

function walls() {
  // Function creates walls and colours them
  wallRH = new Sprite(width, height / 2, 8, height, 'k');
  wallRH.color = color('white');
  wallRH.bounciness = 1;
  wallLH = new Sprite(0, height / 2, 8, height, 'k');
  wallLH.color = color('red');
  wallTop = new Sprite(width / 2, 0, width, 8, 'k');
  wallTop.color = color('white');
  wallBot = new Sprite(width / 2, height + 4, width * 2, 8, 'k');
  wallBot.color = color('white');
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
    gameStarter();
    ball.vel.x = -5;
    ball.vel.y = 9;
  }
}

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
      text("Game over! you got a score of: " + score_pong + "!\nThe game lasted " + timer_pong + " secconds!", width / 4, 200);
      buttonDisplay_pong();
      checkIfHighScoreGreater2();
      gameOver = true;
      noLoop();
    }
  }

  //displays score text
  textSize(30);
  fill('white');
  text("Score: " + score_pong, 20, 42);

  if (fireBasePongHighScore > 0) {
    fill("white");
    textSize(30);
    text("HighScore: " + fireBasePongHighScore, 20, 75)
  }

  //timer text
  textSize(50);
  fill('white');
  text(timer_pong, width - 65, 60);
}

//players score
function increaseScore() {
  score_pong++;
  console.log("players score is " + score_pong);

  //starts timer 
  timerStart = true;

  // makes game harder
  if (score_pong == 3) {
    wallRH.bounciness = 1.2;
  }
  if (score_pong == 7) {
    wallRH.bounciness = 1.5;
    paddleSpeedDown = 10;
    paddleSpeedUp = -10;
  }
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
    timer_pong += 1;
  }
}

// BUTTON FUNCTIONS

function buttonDisplay_pong() {
  // displays buttons
  // reset button
  button_pong = createButton('Reset game!');
  button_pong.position(width / 4, 260);
  button_pong.mousePressed(restartGame_pong);
  // return to game page button
  button2_pong = createButton('Return to home page!');
  button2_pong.position(width / 4 + 150, 260);
  button2_pong.mousePressed(SendPlayerBack_pong);


  function restartGame_pong() {
    console.log("RESTARTING GAME");
    // if reset button clicked resets and remove items 
    button_pong.remove();
    button2_pong.remove();
    ball.remove();
    paddle.remove();
    clearInterval(intervalTimer);
    clearInterval(intervalTimer2);
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

  }

  // if return to game home button clicked sends user back to home page
  function SendPlayerBack_pong() {
    console.log("Sending user to game Page");
    window.location = "/../gameHomePage.html";
  }
}

// FIREBASE ITEMS

function fb_readHighScore2() {
  // reads high score
  firebase.database().ref('/userGameScores/pongGame/' + userDataObject.userID + '/highScore/').once('value', DO_THIS);
  //saves high score
  function DO_THIS(snapshot) {
    fireBasePongHighScore = snapshot.val();
  }
}

function checkIfHighScoreGreater2() {
  console.log("fb, users high score is " + fireBasePongHighScore);
  // saves score to firebase
  firebase.database().ref('userGameScores/pongGame/' + userDataObject.userID + '/lastScore/').set(
    score_pong
  );
  // checks if current score is bigger than highscore
  if (fireBasePongHighScore < score_pong) {
    console.log("updating users highscore")
    // writes score ti highscore
    firebase.database().ref('userGameScores/pongGame/' + userDataObject.userID + '/highScore/').set(
      score_pong
    );
  }
}

// highscore items below
// reads highsore from databse
function highScoreReader() {
  console.log("Reading highscores");
  firebase.database().ref('/userGameScores/pongGame/').orderByChild('highScore').limitToLast(3).once('value', function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(savesHighScoreInfo);
  }, fb_error);
}

// saves firebase highscore items to variable
function savesHighScoreInfo(child) {
  console.log(child.val());
  fb_data = child.val();
  console.log(fb_data.highScore);
  console.log(fb_data.userDisplayName);
}

// end of code
