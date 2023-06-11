// FIREBASE SHOOTER GAME ITEMS
// VARS 
var fb_ShooterHighScore;
var highScoreNumber = 3;
var shooterHighScoreTable = [];
// FIREBASE FUNCTIONS FOR SHOOTERGAME BELOW 

// highscore read function
function fb_readHighScore1() {
  // reads high score
  firebase.database().ref('/userGameScores/shooterGame/' + userDataObject.userID + '/highScore/').once('value', DO_THIS);
  //saves high score
  function DO_THIS(snapshot) {
    fb_ShooterHighScore = snapshot.val();
  }
}

// Highscore write function
function checkIfHighScoreGreater1() {
  console.log("users high score is " + fb_ShooterHighScore);
  // saves score to firebase
  firebase.database().ref('userGameScores/shooterGame/' + userDataObject.userID + '/lastScore/').set(
    score_shooterGame
  );
  // checks if current score is bigger than highscore
  if (fb_ShooterHighScore < score_shooterGame) {
    console.log("USER HAS NEW HIGHSCORE");
    // writes score to highscore
    firebase.database().ref('userGameScores/shooterGame/' + userDataObject.userID + '/highScore/').set(
      score_shooterGame
    );
  }
}

// highscore firebase items below 
// reads highsore from databse
function fb_highScoresTableReader2() {
  console.log("Reading highscores");
  // clears array and reset highscore number
  highScoreNumber = 3;
  shooterHighScoreTable = [];
  firebase.database().ref('/userGameScores/shooterGame/').orderByChild('highScore').limitToLast(3).once('value', function(snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(savesHighScoreInfo);
  }, fb_error);
}

// saves firebase highscore items to variable
function savesHighScoreInfo(child) {
  var fb_data2 = highScoreNumber + ". " + child.val().userDisplayName + ": " + child.val().highScore;
    highScoreNumber--;

  // asigns items to an array
  shooterHighScoreTable.push(fb_data2);
  console.log(shooterHighScoreTable);
}