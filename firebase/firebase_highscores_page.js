//FIREBASE ITEMS FOR HOME PAGE (GAME HOME PAGE)
// vars
var top10HighScores_shooter = [];
var top10HighScores_pong = [];
var highScoreTableRank_shooter = 10;
var highScoreTableRank_pong = 10;
var loadingText = "Loading highscores..";
var highScoresLoaded = false


function setup() {
  //creats canvas and main player
  cnv = new Canvas(windowWidth, windowHeight);
}


function draw() {
  fill("black");
  textSize(30);

  if (!highScoresLoaded) {
    text(loadingText, width / 2 - 500, height / 2 - 370);
    text(loadingText, width / 2 + 240, height / 2 - 370);
    return;
  }
  else {
    background(255);
    return;
  }
  if (highScoresLoaded == true) {
    //highscore table
    for (i = top10HighScores_shooter.length - 1; i >= 0; i--) {
      // title
      text("Shooter game top 10 highscores", width / 2 - 550, height / 2 - 370)
      // flips array 
      let valueFlip_shooter = top10HighScores_shooter.length - i - 1;
      // displays highscore table

      text(top10HighScores_shooter[i], width / 2 - 500, height / 2 - 330 + 35 * valueFlip_shooter);
    }

    for (i = top10HighScores_pong.length - 1; i >= 0; i--) {
      // title
      text("Pong game top 10 highscores", width / 2 + 240, height / 2 - 370);
      // text("Shooter game highscores", width/2 , height /2 - 370)
      // flips array 
      let valueFlip_shooter = top10HighScores_pong.length - i - 1;
      // displays highscore table
      text(top10HighScores_pong[i], width / 2 + 300, height / 2 - 330 + 35 * valueFlip_shooter);
    }
  }

}

// highscore items below
// HIGHSCORE SHOOTER GAME
// reads highsore from databse
function readHighScoreHomePage_shooter() {
  console.log("Reading top 10 scores");
  // clears arrray
  top10HighScores_shooter = [];
  // pulls the 10 highscores
  firebase.database().ref('/userGameScores/shooterGame/').orderByChild('highScore').limitToLast(10).once('value', function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(savetop10HighScores)
    highScoresLoaded = true;
  }, fb_error);
}

function savetop10HighScores(child) {
  // asigns to var
  var fb_highScoresTop10 = highScoreTableRank_shooter + ". " + child.val().userDisplayName + ": " + child.val().highScore;
  highScoreTableRank_shooter--;
  // asigns item to array
  top10HighScores_shooter.push(fb_highScoresTop10);
  console.log(top10HighScores_shooter)
}

//HIGHSCORE PONG GAME
// reads highsore from databse
function readHighScoresHomePage_pong() {
  // clears array
  top10HighScores_pong = [];
  console.log("Reading highscores");
  // reads the top 3 scores
  firebase.database().ref('/userGameScores/pongGame/').orderByChild('highScore').limitToLast(10).once('value', function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(savesHighScoreInfo);
    highScoresLoaded = true;
  }, fb_error);
}

// saves firebase highscore items to variable
function savesHighScoreInfo(child) {
  var fb_dataHighScoresTop10 = highScoreTableRank_pong + ". " + child.val().userDisplayName + ": " + child.val().highScore;
  highScoreTableRank_pong--;
  // asigns items to array
  top10HighScores_pong.push(fb_dataHighScoresTop10);
  console.log(top10HighScores_pong);
}
