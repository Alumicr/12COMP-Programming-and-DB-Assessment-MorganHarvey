//vars n stuff
var FbHasUpdated = false;
var userScreenName;
var userPassword;
var usersEmail;
var userID;
var userName;
var userPhoto;
let gameDataObject;
let userDataObject;


//FIREBASE ERROR
//sends out error message
function fb_error(error) {
  console.log("Error found");
  console.error(error);
}

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
  // makes new object and asigns items to object
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
//USER CHANGING DISPLAYNAME FUNCTIONS BELOW
// user wants to change there display name
function userChangeName() {
  FbHasUpdated = false;
  //saves new display name
  console.log("Returning HTML registration values");
  userScreenName = (HTML_screen_name.value);
  console.log(userDataObject);
  updateHTML();
  updateFireBaseNewScreenName()
}

function updateFireBaseNewScreenName() {
  // updates firebase
  firebase.database().ref('userGameScores/pongGame/' + userDataObject.userID + '/userDisplayName/').set(
    userScreenName
  )
  firebase.database().ref('userGameScores/shooterGame/' + userDataObject.userID + '/userDisplayName/').set(
    userScreenName
  )
  firebase.database().ref('userRegDetails/' + userDataObject.userID + '/userDisplayName/').set(
    userScreenName
  )
  // updates var
  console.log("Firebase has updated");
  FbHasUpdated = true;
  updateHTML();
}
function updateHTML() {
  // updates html
  var statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = "Updating your screen name.. please wait.."

  if (FbHasUpdated == true) {
    setTimeout(function() {
      //if var is set shows confermation text
      statusMessage.textContent = "Your screen name  has been updated!";
    }, 2000);
  }

  setTimeout(function() {
    // clears html
    statusMessage.textContent = "";
  }, 5000);

}

//BUTTON FUNCTIONS BELOW
// send user to game when button clicked
function shooterGamePageSender() {
  console.log("Sending user to shooter game")
  window.location = "games/shooterGame/shooter.html";
}
// sends user to pong game when button clicked
function pongGameSender() {
  console.log("Sending user to pong game");
  window.location = "games/pongGame/pong1.html";
}
// sends user to shooter game
function sendUserToHighScorePage() {
  console.log("Sending user to highscore page");
  window.location = "highScorepage.html";
}

// sends user to log in page (logs user out)
function logUserOut() {
  console.log("Logging user out");
  window.location = "index.html";
}

// end of code