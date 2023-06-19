//vars
var validationPassed = false;

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

//HTML TEXTS BELOW
function changeLandingHTMLText() {
  //CHANGES HTML TEXT
  //changes HTML text instantly when button is pressed to loading message for log in page
  document.getElementById("logInButtonMessage").innerHTML = "Checking user registration...";
}


//UPDATES HTML FOR changeUserDetails.html
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

//VALDATION FOR REGISTRATION PAGE
function validationForRegistrationPage() {
  //collects the ID for the html text
  var registrationText = document.getElementById("registartionConfermationMessage");
  //checks if both are 0
  if (userScreenName.length == 0 && userPassword.length == 0) {
    registrationText.textContent = "Your screen name and password are too short. Please enter a a valid password and screen name!"
    document.getElementById("registrationButton").disabled = false;
  }
  //checks if display name is over 10 charcaters
  else if (userScreenName.length > 10) {
    console.error("INVALID SCREEN NAME")
    //unlocks button
    document.getElementById("registrationButton").disabled = false;
    //displays error message
    registrationText.textContent = "Your screen name is too long! Please enter a valid screen name.";
    textClear();
  }
  //checks display name and displays error message if display name is 0
  else if (userScreenName.length == 0) {
    console.error("INVALID SCREEN NAME")
    //unlocks button
    document.getElementById("registrationButton").disabled = false;
    //dispalsy error message
    registrationText.textContent = "Your screen name is too short! Please enter a valid screen name.";
    textClear();
  }
  //checks password and displays error if password is 0 charcters
  else if (userPassword.length == 0) {
    console.error("INVALID PASSWORD")
    //unlocks button
    document.getElementById("registrationButton").disabled = false;
    //dispalsy error message
    registrationText.textContent = "Your password is too short! Please enter a valid password.";
    textClear();
  }
  else {
    validationPassed = true;
  }
  function textClear() {
    setTimeout(function() {
      //removes the text after a certain time
      registrationText.textContent = " ";
    }, 2000);
  }
}


//END OF CODE