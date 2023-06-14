//vars 
var FbHasUpdated = false;
var screenNameError = false;
var updatingFireBaseNewScreenName = false;
var userScreenName;
var userPassword;
var usersEmail;
var userID;
var userName;
var userPhoto;
var fb_usersDisplayName;
//lets
let gameDataObject;
let userDataObject;

//START OF CODE
//FIREBASE ERROR FUNCTION
function fb_error(error) {
  //sends out error message
  console.log("Error found");
  console.error(error);
}

//CHECK REGISTARTION
function fb_checkRegistration() {
  console.log("Checking Registration");
  //displays html text
  firebase.database().ref('/userRegDetails/' + userDataObject.userID + '/').once('value', _readUID, fb_error);
}

function _readUID(snapshot) {
  console.log(snapshot.val());
  if (snapshot.val() == null) {
    // user has not registered
    console.log("User has not registered");
    //displays html text
    document.getElementById("logInButtonMessage").innerHTML = "You are new here so you will have to register!   Sending you to the Registration page... ";
    // send them to registation page after a certin time
    setTimeout(function() {
      window.location = "register_page.html";
    }, 1500);
  } else {
    //if users is registered
    //reads the user display name
    firebase.database().ref('/userRegDetails/' + userDataObject.userID + '/userDisplayName/').once('value',
      function(snapshot) {
        //asigns to var
        fb_usersDisplayName = snapshot.val();
        console.log(fb_usersDisplayName);
        displayHTML();
        console.log("User is registered");
      }, fb_error);

    function displayHTML() {
      //displays html text with the plays displayname
      document.getElementById("logInButtonMessage").innerHTML = "Welcome back " + fb_usersDisplayName + "! Sending you to the game page...";
      //sends them to game page after a certin time
      setTimeout(function() {
        window.location = "gameHomePage.html";
      }, 1500);
    }
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
  //disables button
  updatingFireBaseNewScreenName = true;
  document.getElementById("registrationButton").disabled = true;
  var registrationnText = document.getElementById("registartionConfermationMessage");
  //updates html text
  registrationnText.textContent = "Saving registration data... ";
  // saves users data from HTML form
  console.log("Returning HTML registration values");
  console.log(HTML_screen_name.value);
  console.log(HTML_password.value);
  userScreenName = (HTML_screen_name.value);
  userPassword = (HTML_password.value);
  //checks if display name is over 10 charcaters
  if (userScreenName.length > 10) {
    //unlocks button
    document.getElementById("registrationButton").disabled = false;
    //displays error message
    registrationnText.textContent = "Your screen name is too long! Please enter a valid screen name.";
    setTimeout(function() {
      //removes the text after a certain time
      registrationnText.textContent = " ";
    }, 2000)
  }

  else {
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
}


function fb_saveData() {
  // save data to database
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
    //updates html text
    document.getElementById("registartionConfermationMessage").innerHTML = "Welcome " + userDataObject.userDisplayName + "! Sending you to the game page..";
    setTimeout(function() {
      //sends user to game page after a while
      window.location = "gameHomePage.html";
    }, 1500);
  }
}
//USER CHANGING DISPLAYNAME FUNCTIONS BELOW
// user wants to change there display name
function userChangeName() {
  //disables the button
  document.getElementById("ChangeScreenNameButton").disabled = true;
  FbHasUpdated = false;
  //saves new display name
  console.log("Returning HTML registration values");
  userScreenName = (HTML_screen_name.value);
  console.log(userDataObject);

  //limits screen name to a certain size
  if (userScreenName.length > 10) {
    screenNameError = true;
    updateHTML();
  }

  else {
    fb_updateFireBaseNewScreenName();
    updateHTML();
  }
}

function fb_updateFireBaseNewScreenName() {
  // updates firebase with users screen name
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
  //calls update html function
  updateHTML();
}

//HTML CHANGE FUNCTIONS BELOW
function updateHTML() {
  // updates html
  var statusMessage = document.getElementById("statusMessage");
  statusMessage.textContent = "Updating your screen name.. please wait.."

  //displays error message if screen name to long
  if (screenNameError == true) {
    console.log("INAVLID SCREENNAME");
    statusMessage.textContent = "Your screen name is too long! Max character count is 10 characters! Please enter a valid screen name!"
    //enables the button
    document.getElementById("ChangeScreenNameButton").disabled = false;
    updatingFireBaseNewScreenName = false;
    screenNameError = false;
    clearText();
  }
  //displays confermation text a certain time after var is changed
  if (FbHasUpdated == true) {
    setTimeout(function() {
      statusMessage.textContent = "Your screen name  has been updated!";
      //enables the button
      updatingFireBaseNewScreenName = false;
      document.getElementById("ChangeScreenNameButton").disabled = false;
    }, 2000);
    clearText();

    function clearText() {
      setTimeout(function() {
        if (updatingFireBaseNewScreenName == false) {
          // clears html text after a certain time and if var is set
          statusMessage.textContent = "";
        }
      }, 3000);
    }
  }
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
  //disables button
  document.getElementById("logOutButonID").disabled = true;
  console.log("Logging user out");
  //logs user out
  window.location = "index.html";
}

//CHANGES HTML TEXT
function changeLandingHTMLText() {
  //changes HTML text instantly when button is pressed to loading message
  document.getElementById("logInButtonMessage").innerHTML = "Checking user registration...";
}

// end of code