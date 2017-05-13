var stage, output, lifeGage, hero1, enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, guy, canvas, ctx;

var leftMotion = -10;
var rightMotion = 10;
var direction = leftMotion;

var heroHeight = 50;
var heroWidth = 30;

var startingPositionX;
var startingPositionY;

var heroX;
var heroY;

var upPressed = false;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var spacePressed = false;

var timer = 0;
var currLife = 120;

var startButton;
var startLabel;
var hdamag = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function start() {
	stage = new createjs.Stage("amazingCanvas");
	canvas = stage.canvas;
	startButton = new createjs.Shape();
	startLabel = new createjs.Text("Start", "bold 75px Courier", "#ff7700");
	startLabel.x = stage.canvas.width / 2 - 110	;
	startLabel.y = stage.canvas.height / 2 - 50;
	
	startButton.fillCmd = startButton.graphics.beginFill("green").command;


	startButton.graphics.beginStroke("black").drawRect(-200, -100, 400, 200);
	console.log(stage.canvas.width / 2);


	startButton.x = stage.canvas.width / 2;
	startButton.y = stage.canvas.height / 2;

	startButton.cursor = "pointer";

	startButton.on("click", function(event) {
		startButton.fillCmd.style = "#00ff00";
		stage.update(event);
		stage.removeAllChildren();
		init();
	});

	stage.enableMouseOver();

	stage.addChild(startButton);
	stage.addChild(startLabel);
	stage.update();
}



function gameOver() {
	//stage = new createjs.Stage("amazingCanvas");
	
	restartButton = new createjs.Shape();
	
	restartLabel = new createjs.Text("Restart", "bold 75px Courier", "#ff7700");
	restartLabel.x = stage.canvas.width / 2 - 150;
	restartLabel.y = stage.canvas.height / 2 - 50;
	
	endLabel = new createjs.Text("Game Over :(", "bold 75px Courier", "#ff7700");
	endLabel.x = stage.canvas.width / 2 - 275;
	endLabel.y = stage.canvas.height / 2 - 250;
	
	restartButton.fillCmd = restartButton.graphics.beginFill("green").command;


	restartButton.graphics.beginStroke("black").drawRect(-200, -100, 400, 200);
	console.log(stage.canvas.width / 2);


	restartButton.x = stage.canvas.width / 2;
	restartButton.y = stage.canvas.height / 2;

	restartButton.cursor = "pointer";
	restartLabel.cursor = "pointer";

	restartButton.on("click", function(event) {
		stage.update(event);
		stage.removeAllChildren();
		currLife = 120;
		init();
	});


	stage.enableMouseOver();
	stage.addChild(restartButton);
	stage.addChild(restartLabel)
	stage.addChild(endLabel);
	stage.update();


}


function init() {
	//stage = new createjs.Stage("amazingCanvas");
	//canvas = stage.canvas;
	//ctx = canvas.getContext("2d");
	//console.log(canvas.width, canvas.height)

	startingPositionX = (stage.canvas.width-heroWidth)/2;
	startingPositionY = (stage.canvas.height-heroHeight)/2;

	var lifeBox = new createjs.Shape();
	lifeGage = new createjs.Shape();
	lifeGage.graphics.beginFill("green").drawRect(0, 0, 120, 20);
	lifeBox.graphics.beginStroke("black").drawRect(-1, -1, 122, 22);
	lifeGage.x = lifeGage.y = 10;
	lifeBox.x = lifeBox.y = 10;

    hero1 = new hero([30,50], startingPositionX, startingPositionY, 1);
    hero1.appear(stage);
    hero1.graphic.setBounds(hero1.graphic.x, hero1.graphic.x, hero1.size[0], hero1.size[1]);

    enemy6 = new enemy([50, 70], 40, [25, 180], 4);
    enemy6.appear(stage);
    enemy6.graphic.setBounds(enemy6.graphic.x, enemy6.graphic.y, enemy6.size[0], enemy6.size[1]);

	enemy1 = new createjs.Shape();
	enemy1.fillCmd = enemy1.graphics.beginFill("red").command;
	enemy1.graphics.drawRect(0, 0, 50, 70)
	enemy1.x = stage.canvas.width - 50;
	enemy1.y = stage.canvas.height - 100;
	enemy1.setBounds(enemy1.x, enemy1.y, 50, 70);

	stage.addChild(enemy1);
	stage.addChild(lifeGage);
	stage.addChild(lifeBox);

	stage.update();

	createjs.Ticker.on("tick", tick); //executes tick every frame
	createjs.Ticker.setFPS(100);

	enemy1.on("click", function(event){
		enemy1.fillCmd.style = "green";
		console.log("clicked");
		stage.update(event);
	});
}

function keyDownHandler(e) {
    if(e.keyCode == 38) 		{upPressed = true;}
    else if(e.keyCode == 39) 	{rightPressed = true;}
    else if(e.keyCode == 37) 	{leftPressed = true;}
    else if(e.keyCode == 40) 	{downPressed = true;}
    else if(e.keyCode == 32) 	{spacePressed = true;}
}
function keyUpHandler(e) {
    if(e.keyCode == 38) 		{upPressed = false;}
    else if(e.keyCode == 39) 	{rightPressed = false;}
    else if(e.keyCode == 37) 	{leftPressed = false;}
    else if(e.keyCode == 40) 	{downPressed = false;}
    else if(e.keyCode == 32) 	{spacePressed = false;}
}

function hero(size, startingX, startingY, speed){
	this.size = size
	this.startingX = startingX;
	this.startingY = startingY;
	this.xPosition = null;
	this.yPosition = null;
	this.speed = speed;
	this.graphic = {}
	this.direction = null;
}
hero.prototype.appear = function(stage1){
	this.graphic = new createjs.Shape();
	this.graphic.fillCmd = this.graphic.graphics.beginFill("#333333").command;
	this.graphic.graphics.drawRect(0, 0, this.size[0], this.size[1]);
	this.xPosition = this.startingX;
	this.yPosition = this.startingY;
	this.graphic.x = this.xPosition;
	this.graphic.y = this.yPosition;
	this.direction = 1;
	stage1.addChild(this.graphic);
	return this.graphic;
}
hero.prototype.disappear = function(stage1){
	stage1.removeChild(this.graphic);
	this.direction = null;
}

function enemy(size, yPosition, xRange, speed){
	this.size = size
	this.xPosition = null;
	this.yPosition = yPosition;
	this.xRange = xRange;
	this.speed = speed;
	this.graphic = {};
	this.direction = 0;
}
enemy.prototype.appear = function(stage1){
	this.graphic = new createjs.Shape();
	this.graphic.fillCmd = this.graphic.graphics.beginFill("red").command;
	this.graphic.graphics.drawRect(0, 0, this.size[0], this.size[1]);
	this.xPosition = Math.random() * (this.xRange[1] -  this.xRange[0]) + this.xRange[0];
	this.graphic.x = this.xPosition;
	this.graphic.y = this.yPosition;
	this.direction = Math.floor(Math.random() * 2) * 2 - 1;
	stage1.addChild(this.graphic);
	return this.graphic;
}
enemy.prototype.disappear = function(stage1){
	stage1.removeChild(this.graphic);
	this.direction = 0;
}

function adjustBounds(obj) {
	obj.setBounds(obj.x, obj.y, 50, 70);
}

function checkCollision(rect1, rect2) {
    if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
    return true;
}

function enemyMove(enemy){
	if(enemy.graphic.x <= enemy.xRange[0])			{enemy.direction = 1;}
	else if(enemy.graphic.x >= enemy.xRange[1]) 	{enemy.direction = -1;}
	enemy.graphic.x += enemy.direction * enemy.speed;
}

function tick(event) {
    if(upPressed && hero1.yPosition > 0) {
        hero1.yPosition -= 1;
    }
    if(rightPressed && hero1.xPosition < canvas.width-heroWidth) {
        hero1.xPosition += 1;
        hero1.direction = 1;
    }
    if(leftPressed && hero1.xPosition > 0) {
        hero1.xPosition -= 1;
        hero1.direction = -1;
    }
    if(downPressed && hero1.yPosition < canvas.height-heroHeight) {
        hero1.yPosition += 1;
    }

    var skew
    if(spacePressed){
    	if(hero1.direction == 1){skew = 17;}
    	else					{skew = -17;}
    }
    else{
    	skew = 0;
    }
    hero1.graphic.skewX= skew;
    hero1.graphic.x = hero1.xPosition + hero1.size[1] * Math.sin(skew*Math.PI/180);
    hero1.graphic.y = hero1.yPosition + hero1.size[1] * (1 - Math.cos(skew*Math.PI/180));


	enemy1.x += direction;

	enemyMove(enemy6);

	if (enemy1.x < 0) { 
		direction = rightMotion;
		fightDirChange();
	}
	if (enemy1.x > stage.canvas.width) { 
		direction = leftMotion;
		fightDirChange();
	}		

	adjustBounds(hero1.graphic);
	adjustBounds(enemy1);
	var bound1 = hero1.graphic.getBounds();
	var bound2 = enemy1.getBounds();


	if (checkCollision(bound1, bound2)) {
		if (hdamag >= 50) {
			if (currLife <= 20)
				currLife = 0;
			else
				currLife-=20;
			hdamag = 0;
			stage.removeChild(lifeGage);
			lifeGage = new createjs.Shape();
			lifeGage.graphics.beginFill("green").drawRect(0, 0, currLife, 20);
			lifeGage.x = lifeGage.y = 10;
			stage.addChild(lifeGage);
			stage.update();
		}
	}
	stage.update(event);
	if (currLife <= 0) {
		stage.removeAllChildren();
		stage.update();
		createjs.Ticker.removeAllEventListeners();
		gameOver();
	}
	hdamag++;

	stage.removeChild(lifeGage);
	lifeGage = new createjs.Shape();
	lifeGage.graphics.beginFill("green").drawRect(0, 0, currLife, 20);
	lifeGage.x = lifeGage.y = 10;
	stage.addChild(lifeGage);
	stage.update();
}


function fightDirChange() {
	enemy1.direction = !enemy1.direction;
	enemy1.fillCmd.style = enemy1.direction ? "red" : "black";
	
	if (currLife < 119)
		currLife+=2;


}