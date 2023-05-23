// Start of Code
// misc vars 
var gameOver = false;
var waveStarted = false;
var damageText;
// player vars
var player;
var deadPlayer;
var bullet;
//normal enemy vars
var enemy1;
var normalEnemySpawnCount = 6;//will change these to const if i don't get around to making more ablitys
//strong enemy vars
var enemy2;
var strongEnemySpawnCount = 3;
//speed enemy vars
var enemy3;
var speedEnemySpawnCount = 5;
//ablity items
var doublePointAblity;
var doublePointAblitySpawned = false;
var ablityText;
//deadText vars 
var deadText = {
  fill: "white"
};
var deadTextPostionX;
var deadTextPostionY;
// other vars
//player lets
let playerHealth = 100;
let bulletDamage = 1;
let bulletSpawnDistance = 40;
//normal enemy lets
let enemy1Health = 2;
let normalEnemyScoreValue = 2;
let normalEnemySpeed = 1.7;
//strong enemy lets
let enemy2Health = 3;
let strongEnemySpeed = 1.1;
let strongEnemyScoreValue = 3;
//speed enemy lets
let enemy3Health = 1;
let speedEnemySpeed = 2.9
let speedEnemyScoreValue = 1;
//other lets
let score = 0;
let timer = 3;
let doublePointTimer = 0;
//player consts
const PLAYERSAFESPAWNINGZONE = 130;
const PLAYERDEADVALUE = 0;
//normal enemy consts
const ENEMY1DAMAGE = 25;
//strong enemy consts
const ENEMY2DAMAGE = 50;
//speed enemy consts
const ENEMY3DAMAGE = 10;
//other consts
const PLAYERFLASHTIME = 0300;
const DOUBLEPOINTABLITYSPAWNCOUNT = 1;
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
  setInterval(pre_game, 1000);
}

// GAME FUNCTIONS BELOW

function walls() {
  // function makes walls and sets the colours + adds to group
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


//function gives the player a grace period
function pre_game() {
  if (waveStarted == false && gameOver == false) {
    timer -= 1;
    console.log("Game starting in " + timer);
  }
  if (timer <= 0 && waveStarted == false && gameOver == false) {
    console.log("Wave starting");
    enemyThree();
    waveStarter();
  }
}

//spawn intervals for enemys and timer
function waveStarter() {
  waveStarted = true;
  console.log("Enemy spawning started")
  if (gameOver == false && waveStarted == true) {
    setInterval(gameTimer, 1000);
    setInterval(enemy, 5000);
    setInterval(enemyTwo, 8000);
    setInterval(enemyThree, 11000);
    setInterval(ablityOne, 10500);
  }
}

//function is for game timer
function gameTimer() {
  if (gameOver == false && waveStarted == true) {
    timer += 1;
  }
}

// ENEMY FUNCTIONS BELOW

function enemy() {
  // normal enemy function
  // functions runs if var is false
  if (gameOver == false) {
    // calculates spawn sure it is a certain distance from player
    // calculates values
    for (i = 0; i < normalEnemySpawnCount; i++) {
      var enemyX = random(width);
      var enemyY = random(height);
      var dx = enemyX - player.pos.x;
      var dy = enemyY - player.pos.y
      distance = sqrt(dx * dx + dy * dy);

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
      console.log("enemy spawns found, enemys spawning");
      enemy1.health = enemy1Health;
      normalEnemy.add(enemy1);
    }
  }
}

function enemyTwo() {
  //function spawns stronger enemy
  //runs if var is false
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
      console.log("Strong enemy spawns found, enemys spawning");
      enemy2.health = enemy2Health;
      strongEnemy.add(enemy2);
    }
  }
}

function enemyThree() {
  // function spawns speed enemy
  //runs if var is false
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
      //draws the triangle
      enemy3.draw = function() {
        triangle(0, 30, 30, 0, 35, 35);
      }
      //asigns properties 
      enemy3.health = enemy3Health;
      enemy3.color = color("red");
      console.log("Speed enemy spawns found, enemys spawning");
      speedEnemy.add(enemy3);
    }
  }
}

// PLAYER FUNCTIONS BELOW

function playerDamage() {
  //flashes player red when damge is taken
  console.log("player health is now " + playerHealth);
  player.color = color("red");
  setTimeout(function() {
    player.color = color("white");
  }, PLAYERFLASHTIME);
}

function playerDeath() {
  // runs if player is dead
  if (playerHealth >= 0 && gameOver == true) {
    // calculates deadText spawn postions
    deadTextPostionX = width / 2;
    deadTextPostionY = height / 2;
    //displays death text
    deadText = textSize(32);
    deadText = text("You have died!\nYou survived for " + timer + " seconds\nYou had a score of: " + score + "!", deadTextPostionX, deadTextPostionY);
    // removes all entities
    normalEnemy.remove();
    strongEnemy.remove();
    speedEnemy.remove();
    pointGroup.remove();
    player.remove();
    playerBullets.remove();
    // calls DeadPlayerSpawn function
    DeadPlayerSpawn();
  }
}

function DeadPlayerSpawn() {
  if (gameOver == true && playerHealth >= 0) {
    // function creates dead player that spawns next to deadText
    deadPlayer = new Sprite(deadTextPostionX - 30, deadTextPostionY + 57, 50, 50);
    deadPlayer.color = ("red");
  }
}

//players gun when clicked
function mouseClicked() {
  //Calculates values (making sure it spawns a certain distance from the player)
  let dx = mouseX - player.pos.x;
  let dy = mouseY - player.pos.y;
  let angle = atan2(dy, dx);
  let bulletX = player.pos.x + cos(angle) * bulletSpawnDistance;
  let bulletY = player.pos.y + sin(angle) * bulletSpawnDistance;
  let bulletSpeed = createVector(dx, dy).setMag(8);

  //Creates bullet (using values above) and makes sets colour + speed + adds to group
  bullet = new Sprite(bulletX, bulletY, 13);
  bullet.vel = bulletSpeed;
  bullet.color = color("white");
  playerBullets.add(bullet);
}

// ABLITY FUNCTION
function ablityOne() {
  // function creates doulbepoint sprite
  if (gameOver == false) {
    // calculates values
    for (i = 0; i < DOUBLEPOINTABLITYSPAWNCOUNT; i++) {
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
      // ceats spawns using values above and sets items below + add to group
      doublePointAblity = new Sprite(ablityX, ablityY, 60, "d");
      doublePointAblity.color = color("white");
      doublePointAblity.text = "x2";
      console.log("Ablity spawn found, spawning double time ablity!");
      pointGroup.add(doublePointAblity);
      doublePointAblitySpawned = true;
    }
  }
}

// function doubles value of enemys and resets them
function doublePoints() {
  if (doublePointTimer <= 10) {
    speedEnemyScoreValue * 2;
    normalEnemyScoreValue * 2;
    strongEnemyScoreValue * 2;
    doublePointTimer += 1;
    setTimeout(doublePoints, 1000);
  }
  else {
    speedEnemyScoreValue / 2;
    normalEnemyScoreValue / 2;
    strongEnemyScoreValue / 2;
    console.log("Double points over")
  }
}

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
  if (playerHealth <= PLAYERDEADVALUE) {
    console.log("Game over!");
    playerHealth = PLAYERDEADVALUE;
    gameOver = true;
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
  //enemy 1 control
  for (i = 0; i < normalEnemy.length; i++) {
    enemy1 = normalEnemy[i];
    direction = p5.Vector.sub(player.pos, enemy1.pos);
    enemy1.vel = direction.limit(normalEnemySpeed);
  }

  //enemy 2 control
  for (i = 0; i < strongEnemy.length; i++) {
    enemy2 = strongEnemy[i];
    direction = p5.Vector.sub(player.pos, enemy2.pos);
    enemy2.vel = direction.limit(strongEnemySpeed);
  }

  //enemy 3 control
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
      score += normalEnemyScoreValue;
      console.log("enemy dead");
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
      score += strongEnemyScoreValue;
      console.log("strong enemy dead");
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
      score += speedEnemyScoreValue;
      console.log("speed enemy dead");
    } else {
      bullet.remove();
      enemy.health -= bulletDamage;
    }
  });

  // text items
  // players score
  textSize(30);
  fill("white");
  text("Score: " + score, 10, 35);

  //players health
  text("Health: " + playerHealth, 10, 70);

  //damage notification
  textSize(25);
  fill('red');
  text(damageText, 10, 105);

  //display timer
  textSize(50);
  fill('white');
  text(timer, width - 65, 60);

  // ablity text
  textSize(25)
  text(ablityText, 10, 170);
  fill("white");
  
  //removes text notfication at a set time
  if (damageText) {
    setTimeout(function() {
      damageText = '';
    }, 0700);
  }
  if (ablityText) {
    setTimeout(function() {
      ablityText = '';
    }, 1000);
  }
  if (doublePointAblitySpawned == true) {
    setTimeout(function() {
      pointGroup.remove();
    }, 4500);
  }
}

//end of code 

