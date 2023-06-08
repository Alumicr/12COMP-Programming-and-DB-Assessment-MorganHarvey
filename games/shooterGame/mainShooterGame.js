// Start of Code
// game vars 
var gameOver = false;
var waveStarted = false;
// player and enemy vars
var player;
var deadPlayer;
var bullet;
var enemy1;
var enemy2;
var enemy3;
//ablity items
var doublePointAblity;
var doublePointAblitySpawned = false;
// text vars
var ablityText;
var damageText;
var highScoreTitle = 'HIGHSCORES';
var deadText;
var deadTextPostionX;
var deadTextPostionY;
//player lets
let playerHealth = 100;
let bulletDamage = 1;
//normal enemy lets
let enemy1Health = 2;
let normalEnemyScoreValue = 2;
let normalEnemySpeed = 1.7;   //will change these to const/remove if i don't add more ablitys
//strong enemy lets
let enemy2Health = 3;
let strongEnemySpeed = 1.1;
let strongEnemyScoreValue = 3;
//speed enemy lets
let enemy3Health = 1;
let speedEnemySpeed = 2.9
let speedEnemyScoreValue = 1;
// interval lets
let timerInterval_shooter;
let preGameTimerInterval;
let enemy1Interval;
let enemy2Interval;
let enemy3Interval
let ablity1Interval;
//other lets
let score_shooterGame = 0;
let timer = 3;
let doublePointTimer = 0;
//player consts
const PLAYERSAFESPAWNINGZONE = 130;
//normal enemy consts
const ENEMY1DAMAGE = 25;
//strong enemy consts
const ENEMY2DAMAGE = 50;
//speed enemy consts
const ENEMY3DAMAGE = 10;

// main code
function setup() {
  //creats canvas and main player
  cnv = new Canvas(windowWidth, windowHeight);
  player = new Sprite(width / 2, height / 2, 50, 50, "d");
  player.color = color("white");

  //groups
  pointGroup = new Group();
  normalEnemy = new Group();
  playerBullets = new Group();
  wallGroup = new Group();
  strongEnemy = new Group();
  speedEnemy = new Group();

  //calls walls function
  walls();

  // player movement when key is pressed
  document.addEventListener("keydown", function(event) {
    if (event.code == 'ArrowUp' || event.code == "KeyW") {
      player.vel.y = -5;
    }
    else if (event.code == 'ArrowDown' || event.code == "KeyS") {
      player.vel.y = 5;
    }
    else if (event.code == 'ArrowLeft' || event.code == "KeyA") {
      player.vel.x = -5;
    }
    else if (event.code == "ArrowRight" || event.code == "KeyD") {
      player.vel.x = 5;
    }
  })

  // player movement reset when key is relased 
  document.addEventListener("keyup", function(event) {

    if (event.code == "ArrowUp" || event.code == "ArrowDown" || event.code == "KeyW" || event.code == "KeyS") {
      player.vel.y = 0;
    }
    else if (event.code == "ArrowLeft" || event.code == "ArrowRight" || event.code == "KeyA" || event.code == "KeyD") {
      player.vel.x = 0;
    }
  })

  // calls function after a certain time
  preGameTimerInterval = setInterval(pre_game, 1000);
}

// GAME FUNCTIONS BELOW
// walll function
function walls() {
  // creats makes walls and sets the colours + adds to group
  wallRH = new Sprite(width, height / 2, 8, height, 'k');
  wallRH.color = color('white');
  wallLH = new Sprite(0, height / 2, 8, height, 'k');
  wallLH.color = color('white');
  wallTop = new Sprite(width / 2, 0, width, 8, 'k');
  wallTop.color = color('white');
  wallBot = new Sprite(width / 2, height + 4, width * 2, 8, 'k');
  wallBot.color = color('white');
  wallGroup.add(wallRH);
  wallGroup.add(wallLH);
  wallGroup.add(wallTop);
  wallGroup.add(wallBot);
}

//pre game function
function pre_game() {
  // minus 1 from timer (allows user to have a safe period)
  if (waveStarted == false && gameOver == false) {
    timer -= 1;
    console.log("Game starting in " + timer);
  }
  if (timer <= 0 && waveStarted == false && gameOver == false) {
    //calls functions to start game
    console.log("Wave starting");
    enemyThree();
    waveStarter();
  }
}

//spawn intervals  
function waveStarter() {
  waveStarted = true;
  console.log("Enemy spawning started");
  // runs if vars are correct
  if (gameOver == false && waveStarted == true) {
    // calls functions after set time
    timerInterval_shooter = setInterval(gameTimer, 1000);
    enemy1Interval = setInterval(enemy, 5000);
    enemy2Interval = setInterval(enemyTwo, 8000);
    enemy3Interval = setInterval(enemyThree, 11000);
    ablity1Interval = setInterval(ablityOne, 16000);
  }
}

//function for game timer
function gameTimer() {
  // runs if vars are correct
  if (gameOver == false && waveStarted == true) {
    // adds 1 to timer ez
    timer += 1;
  }
}

// ENEMY FUNCTIONS BELOW    

function enemy() {
  // normal enemy function
  //runs if set var is correct
  if (gameOver == false) {
    // calculates spawn sure it is a certain distance from player
    // calculates values
    for (i = 0; i < 6; i++) {
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
    }
  }
}

function enemyTwo() {
  // strong enemy function
  //function spawns stronger enemy
  //runs if set var is correct
  if (gameOver == false) {
    //calculates values
    for (i = 0; i < 3; i++) {
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
    }
  }
}

function enemyThree() {
  // speed enemy function
  // function spawns speed enemy
  //runs if set var is correct
  if (gameOver == false) {
    // calculates values
    for (i = 0; i < 5; i++) {
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
    }
  }
}

// ABLITY FUNCTIONS BELOW  
function ablityOne() {
  // function creates doulbepoint sprite
  if (gameOver == false) {
    // calculates values
    for (i = 0; i < 1; i++) {
      let ablityX = random(width);
      let ablityY = random(height);
      let dx = ablityX - player.pos.x;
      let dy = ablityY - player.pos.y;
      let distance = sqrt(dx * dx + dy * dy);

      //checks if distance from plyer is allowed so player has to move for ablity
      if (distance < PLAYERSAFESPAWNINGZONE) {
        console.log("Ablity spawn too close, remaking");
        i--;
        continue;
      }
      // creates spawns using values above and sets items below + add to group
      doublePointAblity = new Sprite(ablityX, ablityY, 60, 'd');
      // asigns properties
      doublePointAblity.color = color("white");
      doublePointAblity.text = "x2";
      pointGroup.add(doublePointAblity);
      doublePointAblitySpawned = true;
    }
  }
}

// PLAYER FUNCTIONS BELOW

function playerDamage() {
  //flashes player red when damge is taken
  console.log("player health is now " + playerHealth);
  player.color = color("red");
  setTimeout(function() {
    // resets colour after time
    player.color = color("white");
  }, 0500);
}

//players gun when clicked
function mouseClicked() {
  //Calculates values (making sure it spawns a certain distance from the player)
  let dx = mouseX - player.pos.x;
  let dy = mouseY - player.pos.y;
  let angle = atan2(dy, dx);
  let bulletX = player.pos.x + cos(angle) * 40;
  let bulletY = player.pos.y + sin(angle) * 40;
  let bulletSpeed = createVector(dx, dy).setMag(8);

  //Creates bullet (using values above)
  bullet = new Sprite(bulletX, bulletY, 13);
  // asigns properties
  bullet.vel = bulletSpeed;
  bullet.color = color("white");
  playerBullets.add(bullet);
}

function playerDeath() {
  // runs if player is dead
  if (gameOver == true) {
    // calculates deadText spawn postions
    deadTextPostionX = width / 2;
    deadTextPostionY = height / 2;
    //displays death text
    deadText = textSize(32);
    deadText = fill("red");
    if (score_shooterGame > fb_ShooterHighScore) {
      deadText = text(
        "You have died!\n" +
        "You survived for " + timer + " seconds\n" +
        "You had a score of: " + score_shooterGame + "!" + "\n" +
        "You have a new Highscore!",
        deadTextPostionX,
        deadTextPostionY
      );
    } else {
      deadText = text("You have died!\nYou survived for " + timer + " seconds\nYou had a score of: " + score_shooterGame + "!", deadTextPostionX, deadTextPostionY);
    }
    // removes all entities
    normalEnemy.remove();
    strongEnemy.remove();
    speedEnemy.remove();
    pointGroup.remove();
    player.remove();
    playerBullets.remove();
    // calls DeadPlayerSpawn function
    buttonDisplay();
    // creats dead player next to text
    deadPlayer = new Sprite(deadTextPostionX - 30, deadTextPostionY + 57, 50, 50);
    deadPlayer.color = ("red");
  }
}


// BUTTON FUNCTIONS BELOW

function buttonDisplay() {
  // displays reset button
  button = createButton('Play again!');
  button.position(deadTextPostionX, deadTextPostionY + 140);
  button.mousePressed(restartGame);
  // displays home button
  button2 = createButton('Return to home page!');
  button2.position(deadTextPostionX + 150, deadTextPostionY + 140);
  button2.mousePressed(SendPlayerBack);

  // if home button presssed sends user back to home page
  function SendPlayerBack() {
    console.log("Sending user to home Page");
    window.location = "/../gameHomePage.html";
  }

  // if button clicked restarts game
  function restartGame() {
    // rechecks users highscore 
    fb_readHighScore1();
    console.log("RESTARTING GAME!");
    // clears intervals
    clearInterval(timerInterval_shooter);
    clearInterval(preGameTimerInterval);
    clearInterval(ablity1Interval);
    clearInterval(enemy1Interval);
    clearInterval(enemy2Interval);
    clearInterval(enemy3Interval);
    // resets values
    speedEnemyScoreValue = 1;
    normalEnemyScoreValue = 2;
    strongEnemyScoreValue = 3;
    gameOver = false;
    timer = 3;
    playerHealth = 100;
    score_shooterGame = 0;
    // removes/clears enitys
    deadPlayer.remove();
    button2.remove();
    button.remove();
    deadText = " ";
    //re-loops game and calls setup
    setup();
    loop();
    // starts rechecking of scores 
    fb_readHighScore1();
    fb_highScoresTableReader2();
  }
}


// function doubles value of enemys and resets them
function doublePoints() {
  // runs if set vars are correct
  // doubles the values
  if (doublePointTimer <= 0 && gameOver == false) {
    speedEnemyScoreValue = 2;
    normalEnemyScoreValue = 4;
    strongEnemyScoreValue = 6;
  }
  // resets the values
  if (doublePointTimer >= 10 && gamerOver == false) {
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

//draw function
function draw() {
  //background for canvas
  background("black");

  //player items
  // player rotation
  player.rotation = atan2(mouseY - player.pos.y, mouseX - player.pos.x);

  // player collied with ablity
  player.collide(pointGroup, function(player, doublePointAblity) {
    doublePointAblity.remove();
    console.log("DOUBLE POINTS!");
    doublePoints();
    ablityText = "DOUBLE POINTS!\nDouble points for 10 secconds!";
  });

  //player damage for Normal enemy
  player.collide(normalEnemy, function(player, enemy) {
    enemy.remove();
    playerHealth -= ENEMY1DAMAGE;
    damageText = 'An enemy has hit you!\nYou have taken ' + ENEMY1DAMAGE + ' damage!';
    playerDamage();
  });

  // player damage for strong Enemy 
  player.collide(strongEnemy, function(player, enemy) {
    enemy.remove();
    playerHealth -= ENEMY2DAMAGE;
    damageText = 'A strong enemy has hit you!\nYou have taken ' + ENEMY2DAMAGE + ' damage!'
    playerDamage();
  });

  // player damge for speed Enemy 
  player.collide(speedEnemy, function(player, enemy) {
    enemy.remove();
    playerHealth -= ENEMY3DAMAGE
    damageText = 'A speed enemy has hit you!\nYou have taken ' + ENEMY3DAMAGE + ' damage!'
    playerDamage();
  });

  // checks player health and stops game
  if (playerHealth <= 0) {
    ablityText = '';
    console.log("Game over!");
    playerHealth = 0;
    gameOver = true;
    waveStarted = false;
    checkIfHighScoreGreater1();
    playerDeath();
    noLoop();
  }

  //bullet items
  for (i = 0; i < playerBullets.length; i++) {
    bullets = playerBullets[i];
    if (bullets.collide(wallGroup)) {
      playerBullets.remove(bullets);
      bullets.remove();
    }
  }
  
  //enemy items
  //enemy 1 movement
  for (i = 0; i < normalEnemy.length; i++) {
    enemy1 = normalEnemy[i];
    direction = p5.Vector.sub(player.pos, enemy1.pos);
    enemy1.vel = direction.limit(normalEnemySpeed);
  }

  //enemy 2 movement
  for (i = 0; i < strongEnemy.length; i++) {
    enemy2 = strongEnemy[i];
    direction = p5.Vector.sub(player.pos, enemy2.pos);
    enemy2.vel = direction.limit(strongEnemySpeed);
  }

  //enemy 3 movement
  for (i = 0; i < speedEnemy.length; i++) {
    enemy3 = speedEnemy[i];
    direction = p5.Vector.sub(player.pos, enemy3.pos);
    enemy3.vel = direction.limit(speedEnemySpeed);
  }

  //normal enemy score and enemy death
  playerBullets.collide(normalEnemy, function(bullet, enemy) {
    if (enemy.health <= bulletDamage) {
      bullet.remove();
      enemy.remove();
      score_shooterGame += normalEnemyScoreValue;
    } else {
      bullet.remove();
      enemy.health -= bulletDamage;
    }
  });

  //strong enemy score and enemy death
  playerBullets.collide(strongEnemy, function(bullet, enemy) {
    if (enemy.health <= bulletDamage) {
      bullet.remove();
      enemy.remove();
      score_shooterGame += strongEnemyScoreValue;
    } else {
      bullet.remove();
      enemy.health -= bulletDamage;
    }
  });

  //speed enemy score and enemy death
  playerBullets.collide(speedEnemy, function(bullet, enemy) {
    if (enemy.health <= bulletDamage) {
      bullet.remove();
      enemy.remove();
      score_shooterGame += speedEnemyScoreValue;
    } else {
      bullet.remove();
      enemy.health -= bulletDamage;
    }
  });

  // TEXT ITEMS
  // players score
  fill("white");
  textSize(30);
  text("Score: " + score_shooterGame, 10, 35);

  //players health
  text("Health: " + playerHealth, 10, 70);

  // player highscore displays if its not 0
  if (fb_ShooterHighScore > 0) {
    text("Highscore: " + fb_ShooterHighScore, 10, 105);
  }

  //display timer
  textSize(50);
  text(timer, width - 65, 60);

  // ablity text
  textSize(25)
  text(ablityText, 10, 210);

  //highscore table
  for (i = shooterHighScoreTable.length - 1; i >= 0; i--) {
    // title
    text(highScoreTitle, 10, height / 2 - 30);
    // flips array 
    let valueFlip_shooter = shooterHighScoreTable.length - i - 1;
    // displays highscore table
    text(shooterHighScoreTable[i], 10, height / 2 + 30 * valueFlip_shooter);
  }
  //damage notification
  fill('red');
  text(damageText, 10, 140);

  //removes text and ablity sprites
  if (damageText) {
    setTimeout(function() {
      damageText = '';
    }, 1000);
  }
  if (ablityText) {
    setTimeout(function() {
      ablityText = '';
    }, 10000);
  }
  if (doublePointAblitySpawned == true) {
    setTimeout(function() {
      pointGroup.remove();
      doublePointAblitySpawned = false;
    }, 4000);
  }
}
//end of code