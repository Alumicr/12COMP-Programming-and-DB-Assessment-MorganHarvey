//FIREBASE ITEMS FOR HOME PAGE (GAME HOME PAGE)
// vars
var top10HighScores_shooter = [];
var top10HighScores_pong = [];
var highScoreTableRank =  5;

function setup(){
  //creats canvas and main player
  cnv = new Canvas(windowWidth, windowHeight);
}


function draw() {
  //highscore table
  for (i = top10HighScores_shooter.length - 1; i >= 0; i--) {
    fill("black");
    textSize(30);
    // title
    text("Shooter game highscores", width/2 - 350, height /2 - 370)
    // flips array 
    let valueFlip_shooter = top10HighScores_shooter.length - i - 1;
    // displays highscore table
    text(top10HighScores_shooter[i], width/2 - 350, height/2 -340 + 35 * valueFlip_shooter);
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
  }, fb_error);
}

function savetop10HighScores(child) {
  // asigns to var
  var fb_highScores10 = highScoreTableRank+ ". " +child.val().userDisplayName + ": " + child.val().highScore;
  if (fb_highScores10 == null || child.val().highScore == 0) {
    fb_highScores10 = " ";
  }
  highScoreTableRank--;
  // asigns item to array
  top10HighScores_shooter.push(fb_highScores10);
  console.log(top10HighScores_shooter)
}

//HIGHSCORE PONG GAME
// reads highsore from databse
function readHighScoresHomePage_pong() {
  // clears array
  top10HighScores_pong = [];
  console.log("Reading highscores");
  // reads the top 3 scores
  firebase.database().ref('/userGameScores/pongGame/').orderByChild('highScore').limitToLast(3).once('value', function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(savesHighScoreInfo);
  }, fb_error);
}

// saves firebase highscore items to variable
function savesHighScoreInfo(child) {
  var fb_dataHighScoresTop10 = child.val().userDisplayName + ": " + child.val().highScore;
  if (fb_dataHighScoresTop10 == null) {
    fb_dataHighScoresTop10 = " ";
  }
  // asigns items to array
  top10HighScores_pong.push(fb_dataHighScoresTop10);
  console.log(top10HighScores_pong);
}
