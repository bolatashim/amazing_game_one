var stage, output, hero, enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, guy, canvas, ctx;

var leftMotion = -10;
var rightMotion = 10;
var direction = leftMotion;

// var maxLife = 100;
// var life = 100;

var heroHeight = 50;
var heroWidth = 30;

var heroX;
var heroY;

var upPressed = false;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var spacePressed = false;

var directionRight = true;
var skew = 0;

var timer = 0;
var lifescale = 0.5;
var currLife = 120;
var affecttime = 0;
var objectss = []


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function init() {
	stage = new createjs.Stage("amazingCanvas");
	canvas = stage.canvas;
	ctx = canvas.getContext("2d");
	console.log(canvas.width, canvas.height)

	heroX = (canvas.width-heroWidth)/2;
	heroY = (canvas.height-heroHeight)/2;

	life = new createjs.Shape();
	lifeBack = new createjs.Shape();

	life.graphics.beginFill("green").drawRect(0, 0, 120, 20);
	lifeBack.graphics.beginStroke("black").drawRect(-1, -1, 122, 22);
	life.x = life.y = 10;
	lifeBack.x = lifeBack.y = 10;
	objectss.push(life);

	hero = new createjs.Shape();
	hero.fillCmd = hero.graphics.beginFill("#333333").command;
	hero.graphics.drawRect(0, 0, 30, 50);
    hero.x = heroX;
    hero.y = heroY;

    enemy6 = new enemy(40, [25, 180], 4);
    enemy6.creatGraphic(stage);

	enemy1 = new createjs.Shape();
	enemy1.fillCmd = enemy1.graphics.beginFill("red").command;
	enemy1.graphics.drawRect(0, 0, 50, 70)
	enemy1.x = stage.canvas.width - 50;
	enemy1.y = stage.canvas.height - 100;
	enemy1.setBounds(enemy1.x, enemy1.y, 50, 70);

	hero.setBounds(hero.x, hero.y, 30, 50);

	stage.addChild(enemy1);
	stage.addChild(hero);
	stage.addChild(life);
	stage.addChild(lifeBack);

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

function enemy(yPosition, xRange, speed){
	this.yPosition = yPosition;
	this.xRange = xRange;
	this.speed = speed;
	this.graphic = {}
	this.direction = 0
}
enemy.prototype.creatGraphic = function(stage1){
	this.graphic = new createjs.Shape();
	this.graphic.fillCmd = this.graphic.graphics.beginFill("red").command;
	this.graphic.graphics.drawRect(0, 0, 50, 30);
	this.graphic.x = Math.random() * (this.xRange[1] -  this.xRange[0]) + this.xRange[0];
	this.graphic.y = this.yPosition;
	this.direction = Math.floor(Math.random() * 2) * 2 - 1;
	stage1.addChild(this.graphic);
	return this.graphic;
}
enemy.prototype.removeGraphic = function(stage1){
	stage1.rmoveChild(this.graphic);
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
    if(upPressed && heroY > 0) {
        heroY -= 1;
    }
    if(rightPressed && heroX < canvas.width-heroWidth) {
        heroX += 1;
        directionRight = true;
    }
    if(leftPressed && heroX > 0) {
        heroX -= 1;
        directionRight = false;
    }
    if(downPressed && heroY < canvas.height-heroHeight) {
        heroY += 1;
    }

    if(spacePressed){
    	if(directionRight){
    		skew = 17;
    	}
    	else{
    		skew = -17;
    	}
    }
    else{
    	skew = 0;
    }
    hero.skewX= skew;
    hero.x = heroX + heroHeight * Math.sin(skew*Math.PI/180);
    hero.y = heroY + heroHeight * (1 - Math.cos(skew*Math.PI/180));


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

	adjustBounds(hero);
	adjustBounds(enemy1);
	var bound1 = hero.getBounds();
	var bound2 = enemy1.getBounds();


	if (checkCollision(bound1, bound2)) {
		console.log("collision enemy1 and hero");

		if (++affecttime > 20 && currLife > 0) {
			stage.removeChild(objectss[0]);
			objectss = [];
			
			life = new createjs.Shape();
			if (currLife < 40)
				currLife = 0;
			else
				currLife -= 40;
			life.graphics.beginFill("green").drawRect(0, 0, currLife, 20);
			life.x = life.y = 10;
			stage.addChild(life);
			objectss.push(life);
			affecttime = 0;
		}
	}

	stage.update(event);
}




function fightDirChange() {
	enemy1.direction = !enemy1.direction;
	console.log(enemy1.getBounds());
	enemy1.fillCmd.style = enemy1.direction ? "red" : "black";


	life = new createjs.Shape();
	
	
	life.graphics.beginFill("green").drawRect(0, 0, currLife, 20);
	
	stage.removeChild(objectss[0]);
	objectss = [];
	
	if (currLife < 120)
		currLife+=2;

	life.x = life.y = 10;
	stage.addChild(life);
	objectss.push(life);

}
