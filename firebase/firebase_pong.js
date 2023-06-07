// FIREBASE PONG GAME ITEMS
// VARS
var fb_data;
var fireBasePongHighScore;

// FIREBASE FUNCTIONS BELOW
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
