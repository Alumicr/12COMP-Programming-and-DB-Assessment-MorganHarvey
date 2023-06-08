//vars n stuff
var userScreenName;
var userPassword;
var usersEmail;
var userID;
var score;
var highScore;
var userName;
var userPhoto;
var score;
let gameDataObject;
let userDataObject;

//check to see if user is registerd with database
function fb_checkRegistration() {
  console.log("Checking Registration");
  firebase.database().ref('/userRegDetails/' + userDataObject.userID + '/').once('value', _readUID, fb_error);
}

function _readUID(snapshot) {
  console.log(snapshot.val());
  if (snapshot.val() == null) {
    // user has not registered
    // send them to registation page
    console.log("User has not registered");
    window.location = "register_page.html"
  } else {
    // user is registered
    // send them to the game page
    console.log("User is registered");
    window.location = "gameHomePage.html"
  }
}

// log in with goggle
// runs functions through it
function fb_authenticator(_DOTHIS) {
  console.log("Handling Google login");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // asigns users to object
      userDataObject = {
        userID: user.uid,
        usersEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
      }

      console.log(userDataObject);
      // If user is already logged in, check that
      console.log("Logged in");
      _DOTHIS();
    } else {
      console.log("Not logged in");
      // User is signed out, using a popup
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("Signing in with pop");
        // This gives you a Google access token
        var token = result.credential.accessToken;
        // The signed-in user info
        var user = result.user;
        _DOTHIS();
      });
    }
  });
}

function fb_register() {
  // saves users data from HTML form
  console.log("Returning HTML registration values");
  console.log(HTML_screen_name.value);
  console.log(HTML_password.value);
  userScreenName = (HTML_screen_name.value);
  userPassword = (HTML_password.value);

  // saves data to new object
  let webDataObject = {
    userDisplayName: userScreenName,
    userPassword: userPassword,
  }
  // asigns items to object
  gameDataObject = {
    userDisplayName: userScreenName,
    highScore: 0,
    lastScore: 0,
  }

  // combines the objects into one
  Object.assign(userDataObject, webDataObject);
  console.log(userDataObject);
  fb_saveData();
}

// save data to database
function fb_saveData() {
  console.log("Saving users data to database");
  firebase.database().ref('userGameScores/pongGame/' + userDataObject.userID + '/').set(
    gameDataObject,
  );
  firebase.database().ref('userGameScores/shooterGame/' + userDataObject.userID + '/').set(
    gameDataObject,
  );
  firebase.database().ref('userRegDetails/' + userDataObject.userID + '/').set(
    userDataObject,
  ).then(_DOTHIS);
  function _DOTHIS() {
    window.location = "gameHomePage.html";
  }
}

// send user to game when button clicked
function shooterGamePageSender() {
  console.log("Sending user to shooter game")
  window.location = "games/shooterGame/shooter.html";
}

function pongGameSender() {
  console.log("Sending user to pong game");
  window.location = "games/pongGame/pong1.html";
}

//sends out error if rules are wrong
function fb_error(error) {
  console.log("Error found");
  console.error(error);
}

// end of code