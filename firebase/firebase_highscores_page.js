//FIREBASE ITEMS FOR HOME PAGE (GAME HOME PAGE)
// vars
var top10HighScores_shooter = [];
var top10HighScores_pong = [];
var highScoreTableRank_shooter = 10;
var highScoreTableRank_pong = 10;
var loadingText = "Loading highscores..";
var highScoresLoaded = false


function draw() {
  if (!highScoresLoaded) {
    document.getElementById("shooterGameHighScoresDisplay").innerHTML = loadingText;
    document.getElementById('pongGameHighScoresDisplay').innerHTML = loadingText;
    return;
  }

  if (highScoresLoaded == true) {
    document.getElementById("shooterGameHighScoresDisplay").innerHTML = "";
    document.getElementById("pongGameHighScoresDisplay").innerHTML = "";
    // shooter game highscores
    for (i = top10HighScores_shooter.length - 1; i >= 0; i--) {
      // assign info to HTML
      document.getElementById("shooterGameHighScoresDisplay").innerHTML += "<h5>" + top10HighScores_shooter[i] + "</h5>";
    }
    // pong game highscores
    for (i = top10HighScores_pong.length - 1; i >= 0; i--) {
      // asigns into to html
      document.getElementById("pongGameHighScoresDisplay").innerHTML += "<h5>" + top10HighScores_pong[i] + "</h5>";
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
