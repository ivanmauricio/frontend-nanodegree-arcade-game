/* App.js
 * This file provides the player, enemy and bug classes and their methods.
 * It also contains the global variables which keep a track of the points,
 * lives and which level the player is on. The game state is also tracked
 * (whether it is paused or not). The players, the enemies and the gems are
 * also instantiated in ths file.
 */

//Global Variables

'use strict';

var points = 0,
    pauseGame = false,
    level = 1,
    lives = 4;

/* This makes the enemy class. It takes the parameter locY which specifies
 * where on the canvas each instance will first be drawn.
 */

var Enemy = function(locY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -200;
    this.y = locY;

    //set dimensions of enemy to use in collision method

    this.right = 80;
    this.left = 0;
    this.bottom = 75;
    this.top = 0;
    this.speed = randomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    //resets the enemies position when it goess off screen and assigns
    //new random speed
    if(this.x >= 700) {
        this.x = -200;
        this.speed = randomSpeed();
    }
};

/* Collision method for when enemy collides with the player. When
 * player collides with enemy a life is deducted and the player is
 * reset back to starting position.
 */

Enemy.prototype.collision = function(){
    if(this.x + this.left < player.x + player.right &&
       this.x + this.right > player.x + player.left &&
       this.y + this.top < player.y + player.bottom &&
       this.y + this.bottom > player.y + player.top) {
        lives--;
        player.reset();
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/* Player class which sets the properties of the player, including
 * starting position and dimensions.
 */

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 253;
    this.y = 491;
    //set the dimensions of the player so can work out collisions
    this.right = 80;
    this.left = 0;
    this.bottom = 60;
    this.top = 0;
};

/* Update method for player which adds point everytime it reaches the
 * water and increases the level by one every 30 points. It also changes
 * the player image every 30 points as the player 'evolves' through the
 * levels.
 */

Player.prototype.update = function() {
    //Add 10 points when player reaches water and then reset player position
    if (this.y == -13){
        this.reset();
        points += 10;
    }

    //Every 30 points go up a level and character changes
    level = 1 + Math.floor(points/30);

    if (points >= 30) {
        this.sprite = "images/char-cat-girl.png";
    }
    if (points >= 60) {
        this.sprite = "images/char-pink-girl.png";
    }
    if (points >= 90) {
        this.sprite = "images/char-horn-girl.png";
    }
    if (points >= 120) {
        this.sprite = "images/char-princess-girl.png";
    }
};

/* Render method for player which draws the player on the canvas.
 */

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Make reset method for player to put him back in starting position
 * after collisions or reaching the water.
 */

Player.prototype.reset = function() {
    this.x = 253;
    this.y = 491;
};

//Set the different input keys to move the player
//this method moves player in required direction while at the same time setting limits to
//stop movement out of the canvas boundaries.

Player.prototype.handleInput = function(key) {

    //Sets the arrow keys to change player position as long as within canvas limits and
    //game not paused
    if (key == "up" && this.y > 0 && !pauseGame) {
        this.y -= 42;
    }
    if (key == "down" && this.y < 491 && !pauseGame) {
        this.y += 42;
    }
    if (key == "left" && this.x > 50 && !pauseGame) {
        this.x -= 50;
    }
    if (key == "right" && this.x < 500 && !pauseGame) {
        this.x += 50;
    }

    //Sets the p to pause and unpause game

    if (key == "p" && !pauseGame) {
        pauseGame = true;
    }

    //calls the init function from engine.js to start game again
    else if (key == "p" && pauseGame) {
        pauseGame = false;
        globalInit();
    }
};

/* Gem class with shared values common to all gems. It takes the
 * locY paremeter to specify the y location where it shold be drawn.
 * Also assigns random speed to gems.
 */

var Gem = function(locY) {
    this.sprite = 'images/gem-blue.png';
    this.x = -200;
    this.y = locY;

    //sets enemy dimesnsions to use for collisions

    this.left = 0;
    this.right = 30;
    this.top = -48;
    this.bottom = 15;
    this.speed = randomSpeed();
};

// Update method for Gem class resets position when they go off screen
// and assigns a new random speed to gem.

Gem.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);

    //reset gem position when it goes off screen
    if (this.x >= 750) {
        this.reset();
        this.speed = randomSpeed();
    }
};

/* Render method for gem. Draw the gem on the canvas, scaling it
 * to 50% of actual png size.
 */

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, Resources.get(this.sprite).width * 0.5,
    Resources.get(this.sprite).height*0.5);
};

//Collision method for gem, resets the gems position and adds 5 points to score

Gem.prototype.collision = function () {
    if(this.x + this.left < player.x + player.right &&
       this.x + this.right > player.x + player.left &&
       this.y + this.top < player.y + player.bottom &&
       this.y + this.bottom > player.y + player.top) {
        this.reset();
        points += 5;
    }
};

// reset method for gem to reset position

Gem.prototype.reset = function() {
    this.x = -200;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(62),
                  new Enemy(62),
                  new Enemy(228),
                  new Enemy(228),
                  new Enemy(311),
                  new Enemy(311)];

var player = new Player();

var allGems = [new Gem(116), new Gem(282), new Gem(365)];

/* randomSpeed function for setting speed of enemies and gems.
 * Function sets an increaes random speed as the levels go up.
 */

function randomSpeed() {

//randomSpeed function increases the enemies and gem's speeds for increasing levels
    if (level === 1) {
        return Math.floor((Math.random() * 150) + 50);
    }
    else if (level === 2) {
        return Math.floor((Math.random() * 200) + 100);
    }
    else if (level === 3) {
        return Math.floor((Math.random() * 250) + 150);
    }
    else if (level === 4) {
        return Math.floor((Math.random() * 300) + 200);
    }
    else {
        return Math.floor((Math.random() * 350) + 250);
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'p'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
