//FILE IS FOR PLAYER ITEMS 
// PLAYER VARS AND LETS
var player;
let playerHealth = 100;
//BULELT VAR AND LETS
var bullet;
let bulletDamage = 1;

//START OF CODE

function playerDamage() {
  //flashes player red when damge is taken
  console.log("player health is now " + playerHealth);
  player.color = color("red");
  setTimeout(function() {
    // resets colour after time
    player.color = color("white");
  }, 0555);
}

function mouseClicked() {
  //players gun when clicked
  if (countDownStarted == true && gameOver == false) {
    //RUNS IF VARS ARE SET
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
//END OF CODE