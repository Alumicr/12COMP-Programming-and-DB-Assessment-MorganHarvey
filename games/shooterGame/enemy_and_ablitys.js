//FILE IS FOR ENEMY AND ABLITY FUNCTIONS
//START OF CODE
//ENEMY VARS
var enemy1;
var enemy2;
var enemy3;
// ABLITY VARS
var ablitySprite;
var doublePointAblitySpawned = false;
var healthPackSpawned = false;
//LETS
//normal enemy lets
let enemy1Health = 2;
let normalEnemySpawnCount = 6;
let normalEnemyScoreValue = 2;
let normalEnemySpeed = 1.7; 
//strong enemy lets
let strongEnemySpawnCount = 3;
let enemy2Health = 3;
let strongEnemySpeed = 1.1;
let strongEnemyScoreValue = 3;
//speed enemy lets
let speedEnemySpawnCount = 5;
let enemy3Health = 1;
let speedEnemySpeed = 2.9
let speedEnemyScoreValue = 1;
//ablity lets
let doublePointTimer = 0;
// CONSTS
//normal enemy consts
const ENEMY1DAMAGE = 25;
//strong enemy consts
const ENEMY2DAMAGE = 50;
//speed enemy consts
const ENEMY3DAMAGE = 10;
//player spawn zone
const PLAYERSAFESPAWNINGZONE = 130;

// ENEMY FUNCTIONS BELOW    
function enemy() {
  // normal enemy function
  //runs if set var is correct
  if (gameOver == false) {
    // calculates spawn sure it is a certain distance from player
    // calculates values
    for (i = 0; i < normalEnemySpawnCount; i++) {
      let enemyX = random(width);
      let enemyY = random(height);
      let dx = enemyX - player.pos.x;
      let dy = enemyY - player.pos.y
      let distance = sqrt(dx * dx + dy * dy);
      //checks if distance from player is allowed
      if (distance < PLAYERSAFESPAWNINGZONE) {
        console.log("Enemy spawn too close, remaking");
        i--;
        continue;
      }
      //creates enemies with random postions using values from above
      //asigns properties 
      enemy1 = new Sprite(enemyX, enemyY, 29, 29, "d");
      enemy1.color = color("red");
      enemy1.health = enemy1Health;
      normalEnemy.add(enemy1);
      console.log("Spawning normal enemys");
    }
  }
}

function enemyTwo() {
  // strong enemy function
  //function spawns stronger enemy
  //runs if set var is correct
  if (gameOver == false) {
    //calculates values
    for (i = 0; i < strongEnemySpawnCount; i++) {
      let enemyX = random(width);
      let enemyY = random(height);
      let dx = enemyX - player.pos.x;
      let dy = enemyY - player.pos.y
      let distance = sqrt(dx * dx + dy * dy);
      //checks if distance from player is allowed
      if (distance < PLAYERSAFESPAWNINGZONE) {
        console.log("Enemy spawn too close, remaking");
        i--;
        continue;
      }
      //using values calculated above, makes random spawning locations for strong enemy
      //asigns properties 
      enemy2 = new Sprite(enemyX, enemyY, 60, "d");
      enemy2.color = color("red");
      enemy2.health = enemy2Health;
      strongEnemy.add(enemy2);
      console.log("Spawning strong enemys");
    }
  }
}

function enemyThree() {
  // speed enemy function
  // function spawns speed enemy
  //runs if set var is correct
  if (gameOver == false) {
    // calculates values
    for (i = 0; i < speedEnemySpawnCount; i++) {
      let enemyX = random(width);
      let enemyY = random(height);
      let dx = enemyX - player.pos.x;
      let dy = enemyY - player.pos.y;
      let distance = sqrt(dx * dx + dy * dy);
      //checks if distance from plyer is allowed
      if (distance < PLAYERSAFESPAWNINGZONE) {
        console.log("Enemy spawn too close, remaking");
        i--;
        continue;
      }
      //creates speed enemies with random postions using values from above 
      enemy3 = new Sprite(enemyX, enemyY, "d");
      //draws the triangle over sprite
      enemy3.draw = function() {
        triangle(0, 30, 30, 0, 35, 35);
      }
      //asigns properties 
      enemy3.health = enemy3Health;
      enemy3.color = color("red");
      speedEnemy.add(enemy3);
      console.log("Spawning speed enemys");
    }
  }
}

// ABLITY FUNCTIONS BELOW  
function ablityOne() {
  // function creates ablitys 
  // ONLY RUNS IF SET VARS ARE MET
  if (gameOver == false && score_shooterGame >= 50 && doublePointTimer == 0) {
    // generates random number
    let randomNumberGenerator = Math.random();
    // rounds random number
    randomNumberGenerator = Math.floor(randomNumberGenerator * 100);
    console.log("Random number generated is "+randomNumberGenerator);
    // calculates values
    for (i = 0; i < 1; i++) {
      let ablityX = random(width);
      let ablityY = random(height);
      let dx = ablityX - player.pos.x;
      let dy = ablityY - player.pos.y;
      // calculates distance between ablity and player
      let distance = sqrt(dx * dx + dy * dy);
      //checks if distance from player is allowed so player has to move for ablity
      if (distance < PLAYERSAFESPAWNINGZONE) {
      //if to close removes it and makes it again
        console.log("Ablity spawn too close, remaking");
        i--;
        continue;
      }
      // IF RANDOM NUMBER IS EVEN SPAWNS DOUBLE POINT ABLITY
      if (randomNumberGenerator % 2 == 0) {
        console.log("Spawning double point ablity");
        // creates spawns using values above and sets items below + add to group
        ablitySprite = new Sprite(ablityX, ablityY, 60, 'd');
        // asigns properties and changes value
        ablitySprite.color = color("white");
        ablitySprite.text = "x2";
        abltyGroup.add(ablitySprite);
        doublePointAblitySpawned = true;
      }
      // IF RANDOM NUMBER IS ODD SPAWNS HEALTH PACK
      else {
        console.log("Spawning health pack");
        // creates spawns using values above and sets items below + add to group
        ablitySprite = new Sprite(ablityX, ablityY, 60, 'd');
        // asigns properties
        ablitySprite.color = color("white");
        ablitySprite.text = "50HP";
        abltyGroup.add(ablitySprite);
        // changes value to true
        healthPackSpawned = true;
      }
    }
  }
}

// function doubles value of enemys and resets them
function doublePoints() {
  // resets value
  doublePointAblitySpawned = false;
  // runs if set vars are correct
  // doubles the values
  if (doublePointTimer <= 0 && gameOver == false) {
    speedEnemyScoreValue = 2;
    normalEnemyScoreValue = 4;
    strongEnemyScoreValue = 6;
  }
  // resets the values
  if (doublePointTimer >= 10 && gameOver == false) {
    speedEnemyScoreValue = 1;
    normalEnemyScoreValue = 2;
    strongEnemyScoreValue = 3;
    doublePointTimer = 0;
    console.log("Double points over");
  }
  else if (gameOver == false) {
    //adds to timer, recalls function
    doublePointTimer += 1;
    setTimeout(doublePoints, 1000);
  }
}

//END OF CODE 