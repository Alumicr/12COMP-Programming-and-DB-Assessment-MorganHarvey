//vars 
var fb_HasUpdated = false;
var screenNameError = false;
var screenNameError1 = false;
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
  console.error("Error found");
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
      window.location = "/html/register_page.html";
    }, 1200);
  } else {
    //if users is registered
    //reads the user display name
    firebase.database().ref('/userRegDetails/' + userDataObject.userID + '/userDisplayName/').once('value',
      function(snapshot) {
        //asigns to var
        fb_usersDisplayName = snapshot.val();
        console.log(fb_usersDisplayName);
        console.log("User is registered");
        //cals HTML function
        _DOTHIS();
      }, fb_error);
    
    function _DOTHIS() {
      //displays html text with the plays displayname
      document.getElementById("logInButtonMessage").innerHTML = "Welcome back " + fb_usersDisplayName + "! Sending you to the game page...";
      //sends them to game page after a certin time
      setTimeout(function() {
        window.location = "/html/home_page.html";
      }, 1200);
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
  var registrationText = document.getElementById("registartionConfermationMessage");
  //updates html text
  registrationText.textContent = "Saving registration data... ";
  // saves users data from HTML form
  console.log("Returning HTML registration values");
  console.log(HTML_screen_name.value);
  console.log(HTML_password.value);
  userScreenName = HTML_screen_name.value;
  userPassword = HTML_password.value;
  validationForRegistrationPage();
  //waits for value to be changed from registration validation function above
  if (validationPassed == true) {
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
      window.location = "/html/home_page.html";
    }, 1500);
  }
}
//USER CHANGING DISPLAYNAME FUNCTIONS BELOW
// user wants to change there display name
function userChangeName() {
  //disables the button
  document.getElementById("ChangeScreenNameButton").disabled = true;
  fb_HasUpdated = false;
  //saves new display name
  console.log("Returning HTML registration values");
  userScreenName = (HTML_screen_name.value);
  console.log(userDataObject);
  //small valdation
  //limits screen name to a certain size
  if (userScreenName.length > 15) {
    screenNameError = true;
    updateHTML();
  }
  if (userScreenName.length == 0) {
    screenNameError1 = true;
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
  fb_HasUpdated = true;
  //calls update html function
  updateHTML();
}



// end of code