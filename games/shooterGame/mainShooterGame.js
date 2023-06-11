// Start of Code
//VARS
// game vars 
var gameOver = false;
var countDownStarted = false;
var waveStarted = false;
// player and enemy vars
var player;
var deadPlayer;
var bullet;
// text vars
var countDownText;
var ablityText;
var damageText;
var deadText;
var deadTextPostionX;
var deadTextPostionY;
var highScoreTitle = 'HIGHSCORES';
//LETS
//player lets
let playerHealth = 100;
let bulletDamage = 1;
// interval lets
let timerInterval_shooter;
let preGameTimerInterval;
let enemy1Interval;
let enemy2Interval;
let enemy3Interval
let ablity1Interval;
//other lets
let textRemover;
let score_shooterGame = 0;
let timer = 5;

// main code
function setup() {
  //creats canvas and main player
  cnv = new Canvas(windowWidth, windowHeight);
  player = new Sprite(width / 2, height / 2, 50, 50, "d");
  player.color = color("white");

  //groups
  abltyGroup = new Group();
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
    countDownStarted = true;
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
    ablity1Interval = setInterval(ablityOne, 16500);
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
  if (countDownStarted == true && gameOver == false) {
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
    abltyGroup.remove();
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
    normalEnemyScoreValue = 2;
    normalEnemySpeed = 1.7;
    normalEnemySpawnCount = 6;
    strongEnemyScoreValue = 3;
    strongEnemySpawnCount = 3;
    strongEnemySpeed = 1.1;
    speedEnemySpawnCount = 5;
    speedEnemyScoreValue = 1;
    speedEnemySpeed = 2.9;
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

//draw function
function draw() {
  //background for canvas
  background("black");

  //player items
  // player rotation
  player.rotation = atan2(mouseY - player.pos.y, mouseX - player.pos.x);

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

  // checks player health, changes values and stops game
  if (playerHealth <= 0) {
    countDownStarted = false;
    ablityText = '';
    console.log("Game over!");
    playerHealth = 0;
    doublePointAblitySpawned = false;
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

  // makes game harder
  if (score_shooterGame >= 100) {
    // speeds enemys up
    strongEnemySpeed = 1.35;
    speedEnemySpeed = 3;
    normalEnemySpeed = 2;
  }
  if (score_shooterGame >= 150) {
    // makes more enemys spawn at a certain score
    normalEnemySpawnCount = 8;
    speedEnemySpawnCount = 7;
    strongEnemySpawnCount = 5;
  }
  // makes more enmeys spawn and speeds up some enemys slightly
  if (score_shooterGame >= 200) {
    speedEnemySpawnCount = 8;
    strongEnemySpawnCount = 6;
    strongEnemySpeed = 1.4;
  }

  //ABLITY ITEMS
  // player collied with ablity
  player.collide(abltyGroup, function(player, ablitySprite) {
    ablitySprite.remove();
    if (doublePointAblitySpawned == true) {
      textRemover = 10000;
      console.log("DOUBLE POINTS!");
      doublePoints();
      ablityText = "DOUBLE POINTS!\nDouble points for 10 secconds!";
    }
    else {
      textRemover = 4000;
      playerHealth += 50;
      if (playerHealth > 100) {
        playerHealth = 100;
      }
      console.log("Player has " + playerHealth + " health.")
      ablityText = "You have gained 50 health";
      healthPackSpawned = false;
    }
  });

  // TEXT ITEMS
  // players score
  fill("white");
  textSize(30);
  text("Score: " + score_shooterGame, 10, 35);

  //displays countdown text 
  if (countDownStarted == true && waveStarted == false) {
    countDownText = " ";
    countDownText = "Game Starting in...";
    text(countDownText + " " + timer, width / 2 - 120, height / 2);
  }
  else {
    //removes countdown text
    countDownText = " ";
  }

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
    }, textRemover);
  }
  if (doublePointAblitySpawned == true || healthPackSpawned == true) {
    setTimeout(function() {
      abltyGroup.remove();
      console.log("Removing ablity spawned, player took to long");
      healthPackSpawned = false;
      doublePointAblitySpawned = false;
    }, 4000);
  }
}
//end of code