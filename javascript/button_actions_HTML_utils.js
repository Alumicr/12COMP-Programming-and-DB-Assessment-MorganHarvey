//vars
var validationPassed = false;
var errorHasDisplayed = false;

//BUTTON FUNCTIONS BELOW
// send user to game when button clicked
function shooterGamePageSender() {
  // sends user to shooter game
  console.log("Sending user to shooter game");
  window.location = "/games/shooterGame/shooter.html";
}
// sends user to pong game when button clicked
function pongGameSender() {
  console.log("Sending user to pong game");
  window.location = "/games/pongGame/pong_game.html";
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
  //changes HTML text instantly when button is pressed to loading message for log in page
  document.getElementById("logInMessage").innerHTML = "Checking user registration...";
}

//UPDATES HTML FOR changeUserDetails.html
function updateHTML() {
  // updates html
  var statusMessage = document.getElementById("statusMessage");
  //shows status message 
  statusMessage.innerHTML = "Updating your screen name!<br>Please wait..";

  //ERROR MESSAGES BELOW
  if (screenNameError == true) {
    console.log("INAVLID SCREENNAME");
    //SHOWS IF SCREEN NAME IS TOO LONG
    statusMessage.textContent = "Your screen name is too long! Max character count is 15 characters! Please enter a valid screen name!"
    //enables the button and resets button
    document.getElementById("ChangeScreenNameButton").disabled = false;
    updatingFireBaseNewScreenName = false;
    screenNameError = false;
    clearText();
  }

  if (screenNameError1 == true) {
    console.log("INAVLID SCREENNAME");
    //SHOWS IF SCREEN NAME IS TOO SHORT
    statusMessage.innerHTML = "Your screen name is too short!<br>Please enter a valid screen name!"
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
  errorHasDisplayed = false;
  //collects the ID for the html text
  var registrationText = document.getElementById("registartionConfermationMessage");
  //checks if both are 0
  if (userScreenName.length == 0 && userPassword.length == 0 && usersAge.length == 0) {
    registrationText.innerHTML = "Your screen name, age and password are too short.<br>Please enter a a valid password, age and screen name!"
    errorHasDisplayed = true;
    // unlocks button
    document.getElementById("registrationButton").disabled = false;
    textClear();
  }
  //checks if display name is over 10 charcaters
  else if (userScreenName.length > 15) {
    console.log("INVALID SCREEN NAME");
    //displays error message
    registrationText.innerHTML = "Your screen name is too long!<br>Please enter a valid screen name.";
    errorHasDisplayed = true;
    //unlocks button
    document.getElementById("registrationButton").disabled = false;
    textClear();
  }
  //checks display name and displays error message if display name is 0
  else if (userScreenName.length == 0) {
    console.log("INVALID SCREEN NAME");
    //dispalsy error message
    registrationText.innerHTML = "Your screen name is too short!<br>Please enter a valid screen name.";
    errorHasDisplayed = true;
    //unlocks button
    document.getElementById("registrationButton").disabled = false;
    textClear();
  }
  //checks password and displays error if password is 0 charcters
  else if (userPassword.length == 0) {
    console.log("INVALID PASSWORD");
    //dispalsy error message
    registrationText.innerHTML = "Your password is too short!<br>Please enter a valid password.";
    errorHasDisplayed = true;
    //unlocks button
    document.getElementById("registrationButton").disabled = false;
    textClear();
  }
  else if (isNaN(usersAge) || usersAge < 10 || usersAge > 90) {
    //displays error message
    registrationText.innerHTML = "Invalid age!<br>Please enter a valid age between 10 and 90.";
    errorHasDisplayed = true;
    // unlocks button
    document.getElementById("registrationButton").disabled = false;
    textClear();
  }
  else {
    validationPassed = true;
  }
  //clears the text 
  function textClear() {
    setTimeout(function() {
      if (errorHasDisplayed == true) {
        //removes the text after a certain time
        registrationText.textContent = " ";
        errorHasDisplayed = false;
      }
    }, 3000);
  }
}


//END OF CODE