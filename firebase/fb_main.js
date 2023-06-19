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
        displayHTML();
        console.log("User is registered");
      }, fb_error);

    function displayHTML() {
      //displays html text with the plays displayname
      document.getElementById("logInButtonMessage").innerHTML = "Welcome back " + fb_usersDisplayName + "! Sending you to the game page...";
      //sends them to game page after a certin time
      setTimeout(function() {
        window.location = "/html/gameHomePage.html";
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
  //checks if display name is over 10 charcaters
  if (userScreenName.length > 10) {
    console.error("INVALID SCREEN NAME")
    //unlocks button
    document.getElementById("registrationButton").disabled = false;
    //displays error message
    registrationText.textContent = "Your screen name is too long! Please enter a valid screen name.";
    setTimeout(function() {
      //removes the text after a certain time
      registrationText.textContent = " ";
    }, 2000);
  }
   if (userScreenName.length == 0) {
    console.error("INVALID SCREEN NAME")
    //unlocks button
    document.getElementById("registrationButton").disabled = false;
    //dispalsy error message
    registrationText.textContent = "Your screen name is too short! Please enter a valid screen name.";
    setTimeout(function() {
      //removes the text after a certain time
      registrationText.textContent = " ";
    }, 2000);
  }

   if (userPassword.length == 0) {
    console.error("INVALID PASSWORD")
    //unlocks button
    document.getElementById("registrationButton").disabled = false;
    //dispalsy error message
    registrationText.textContent = "Your password is too short! Please enter a valid password.";
    setTimeout(function() {
      //removes the text after a certain time
      registrationText.textContent = " ";
    }, 2000);
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
      window.location = "/html/gameHomePage.html";
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

  //limits screen name to a certain size
  if (userScreenName.length > 10) {
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

//HTML CHANGE FUNCTIONS BELOW
function updateHTML() {
  // updates html
  var statusMessage = document.getElementById("statusMessage");
  //shows status message 
  statusMessage.textContent = "Updating your screen name.. please wait.."

  //ERROR MESSAGES BELOW
  if (screenNameError == true) {
    console.error("INAVLID SCREENNAME");
    //SHOWS IF SCREEN NAME IS TOO LONG
    statusMessage.textContent = "Your screen name is too long! Max character count is 10 characters! Please enter a valid screen name!"
    //enables the button and resets button
    document.getElementById("ChangeScreenNameButton").disabled = false;
    updatingFireBaseNewScreenName = false;
    screenNameError = false;
    clearText();
  }

  if (screenNameError1 == true) {
    console.error("INAVLID SCREENNAME");
    //SHOWS IF SCREEN NAME IS TOO SHORT
    statusMessage.textContent = "Your screen name is too short! Max character count is 10 characters! Please enter a valid screen name!"
    //enables the button and resets values
    document.getElementById("ChangeScreenNameButton").disabled = false;
    updatingFireBaseNewScreenName = false;
    screenNameError1 = false;
    clearText();
  }
  //CONFERMATION MESSAGE
  //displays confermation text a certain time after var is changed
  if (fb_HasUpdated == true) {
    setTimeout(function() {
      //SHOWS THAT THERE SCREEN NAME HAS BEEN UPDATED
      statusMessage.textContent = "Your screen name has been updated!";
      //enables the button and value
      document.getElementById("ChangeScreenNameButton").disabled = false;
      updatingFireBaseNewScreenName = false;
    }, 2000);
    //clears text function
    clearText();
  }
}

function clearText() {
  // clears the html text for new screen naem page
  setTimeout(function() {
    if (updatingFireBaseNewScreenName == false) {
      // clears html text after a certain time and if var is set
      statusMessage.textContent = "";
    }
  }, 3000);
}


//BUTTON FUNCTIONS BELOW
// send user to game when button clicked
function shooterGamePageSender() {
  console.log("Sending user to shooter game")
  window.location = "/../games/shooterGame/shooter.html";
}
// sends user to pong game when button clicked
function pongGameSender() {
  console.log("Sending user to pong game");
  window.location = "/../games/pongGame/pong1.html";
}
// sends user to shooter game
function sendUserToHighScorePage() {
  console.log("Sending user to highscore page");
  window.location = "/html/highScorepage.html";
}

// sends user to log in page (logs user out)
function logUserOut() {
  //disables button
  document.getElementById("logOutButtonID").disabled = true;
  console.log("Logging user out");
  //logs user out
  window.location = "/../index.html";
}

//CHANGES HTML TEXT
function changeLandingHTMLText() {
  //changes HTML text instantly when button is pressed to loading message
  document.getElementById("logInButtonMessage").innerHTML = "Checking user registration...";
}

// end of code