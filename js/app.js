//GLOBAL VARIABLES
var points = 0;

// Enemies our player must avoid
var Enemy = function(locY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = locY;
    //set dimensions of enemy to use in collision method
    this.right = 80;
    this.left = 0;
    this.bottom = 75;
    this.top = 0;
    this.speed = randomSpeed();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    //resets the enemies position when it goess off screen and assigns
    //new speed
    if (this.x >= 550){
        this.x = -200;
        this.speed = randomSpeed(); 
    }
}

//Make collision method for enemy
//TODO add collision method to undate entities function in engine

Enemy.prototype.collision = function(){
    if(this.x + this.left < player.x + player.right &&
       this.x + this.right > player.x + player.left &&
       this.y + this.top < player.y + player.bottom &&
       this.y + this.bottom > player.y + player.top){
        player.reset();
    }
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 203;
    this.y = 407;
    //set the dimensions of the player so can work out collisions
    this.right = 80;
    this.left = 0;
    this.bottom = 60;
    this.top = 0;
}

Player.prototype.update = function() {
    if (this.y == -13){
        this.reset();
        points += 10;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Make reset method for player to put him back in starting position
//after collisions or reaching the water

Player.prototype.reset = function() {
    this.x = 203;
    this.y = 407;
}

//Set the different input keys to move the player
//this method moves player in required direction while at the same time setting limits to 
//stop movement out of the canvas boundaries.

Player.prototype.handleInput = function(key) {
    if (key == "up" && this.y > 0)
        this.y -= 42;
    if (key == "down" && this.y < 407)
        this.y += 42;
    if (key == "left" && this.x > 50)
        this.x -= 50;
    if (key == "right" && this.x < 400)
        this.x += 50;
}

//TODO ADD COMMENTS
var Gem = function(locY) {
    this.sprite = 'images/gem-blue.png';
    this.x = -200;
    this.y = locY;
    this.left = 0;
    this.right = 30;
    this.top = -48;
    this.bottom = 15;
    this.speed = randomSpeed();
}

//TODO ADD COMMENTS

Gem.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);
    //reset gem position when it goes off screen
    if (this.x >= 750) {
        this.reset();
        this.speed = randomSpeed();
    }
}

//TODO WRITE COMMENT
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, Resources.get(this.sprite).width * 0.5,
    Resources.get(this.sprite).height*0.5);
}

//TODO ADD COMMENT

Gem.prototype.collision = function () {
    if(this.x + this.left < player.x + player.right &&
       this.x + this.right > player.x + player.left &&
       this.y + this.top < player.y + player.bottom &&
       this.y + this.bottom > player.y + player.top){
        this.reset();
        points += 5;
    }
}

//TODO ADD COMMENT

Gem.prototype.reset = function() {
    this.x = -200;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(62),
                  new Enemy(62),
                  new Enemy(145),
                  new Enemy(145),
                  new Enemy(228),
                  new Enemy(228)];

var player = new Player();

var allGems = [new Gem(112), new Gem(195), new Gem(278)];

//randomSpeed function for setting spped of enemies and gems

function randomSpeed() {
    return Math.floor((Math.random() * 250) + 50);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
