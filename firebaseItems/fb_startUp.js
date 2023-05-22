var database;

/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase consol. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_initialise() {  
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOSBHm97y3td6B2Z0MoEDdbMbZCtrBsGU",
  authDomain: "comp-2022-morgan-harvey.firebaseapp.com",
  databaseURL: "https://comp-2022-morgan-harvey-default-rtdb.firebaseio.com",
  projectId: "comp-2022-morgan-harvey",
  storageBucket: "comp-2022-morgan-harvey.appspot.com",
  messagingSenderId: "522072707775",
  appId: "1:522072707775:web:b56480a14b27dcf7a1ac0a",
  measurementId: "G-2R510C98G2"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log(firebase);	
}


