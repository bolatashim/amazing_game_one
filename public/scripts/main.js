var stage, output,scoreGage, lifeGage, hero1, enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, guy, canvas, ctx;

var upPressed = false;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var spacePressed = false;

var timer = 0;
var heroScore = 0;
var startButton;
var startLabel;
var allEnemies = [];

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function start() {
	stage = new createjs.Stage("amazingCanvas");
	canvas = stage.canvas;
	startButton = new createjs.Shape();
	startLabel = new createjs.Text("Go", "bold 80px Arial", "#ff7700");
	startLabel.x = stage.canvas.width / 2 - 60;
	startLabel.y = stage.canvas.height / 2 - 50;
	
	startButton.fillCmd = startButton.graphics.beginFill("green").command;

	startButton.graphics.beginStroke("black").drawRect(-200, -100, 400, 200);
	console.log(stage.canvas.width / 2);


	startButton.x = stage.canvas.width / 2;
	startButton.y = stage.canvas.height / 2;

	startButton.cursor = "pointer";
	startLabel.cursor = "pointer";

	startButton.on("click", function(event) {
		startButton.fillCmd.style = "#00ff00";
		stage.update(event);
		stage.removeAllChildren();
		init();
	});

	startLabel.on("click", function(event) {
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
	restartButton = new createjs.Shape();
	
	restartLabel = new createjs.Text("Go again", "bold 75px Arial", "#ff7700");
	restartLabel.x = stage.canvas.width / 2 - 160;
	restartLabel.y = stage.canvas.height / 2 - 50;
	
	endLabel = new createjs.Text("Game Over :(", "bold 60px Arial", "#ff7700");
	endLabel.x = stage.canvas.width / 2 - 200;
	endLabel.y = stage.canvas.height / 2 - 250;

	endLabel2 = new createjs.Text("Score: " + heroScore, "bold 50px Arial", "#ff7700");
	endLabel2.x = stage.canvas.width / 2 - 120;
	endLabel2.y = stage.canvas.height / 2 - 180;
	
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
		init();
	});

	restartLabel.on("click", function(event) {
		stage.update(event);
		stage.removeAllChildren();
		init();
	});

	stage.enableMouseOver();
	stage.addChild(restartButton);
	stage.addChild(restartLabel)
	stage.addChild(endLabel);
	stage.addChild(endLabel2);
	stage.update();
}


function init() {
	allEnemies = [];
	heroScore = 0;
    hero1 = new hero([30,50], 3, 120);
	var startingPositionX = (stage.canvas.width-hero1.width)/2;
	var startingPositionY = (stage.canvas.height-hero1.height)/2;
    hero1.appear(stage, startingPositionX, startingPositionY);

    heroAttackBound = new bound(hero1.xPosition, hero1.yPosition, 80, 50);

    enemy6 = new enemy([50, 20], 40, [200, 400], 1, 500);
    enemy6.appear(stage);


	placeEnemiesOnMap(stage, 6);

	drawLifeBox();
	drawLifeGage();
	drawScoreCount();
	stage.update();

	createjs.Ticker.on("tick", tick); //executes tick every frame
	createjs.Ticker.setFPS(100);

}

function drawScoreCount(){
	stage.removeChild(scoreGage);
	scoreGage = new createjs.Text("Score: " + heroScore, "bold 30px Arial", "#ff7700");
	scoreGage.y = 4;
	scoreGage.x = stage.canvas.width - 200;
	stage.addChild(scoreGage);
}

function drawLifeBox(){
	var lifeBox = new createjs.Shape();
	lifeBox.graphics.beginStroke("black").drawRect(-1, -1, 122, 22);
	lifeBox.x = lifeBox.y = 10;
	stage.addChild(lifeBox);
}

function drawLifeGage(){
	stage.removeChild(lifeGage);
	lifeGage = new createjs.Shape();
	lifeGage.graphics.beginFill("green").drawRect(0, 0, 120*hero1.currLife/hero1.maxLife, 20);
	lifeGage.x = lifeGage.y = 10;
	stage.addChild(lifeGage);
}

function keyDownHandler(e) {
    if(e.keyCode == 38) 		upPressed = true;
    else if(e.keyCode == 39) 	rightPressed = true;
    else if(e.keyCode == 37) 	leftPressed = true;
    else if(e.keyCode == 40) 	downPressed = true;
    else if(e.keyCode == 32) 	spacePressed = true;
}
function keyUpHandler(e) {
    if(e.keyCode == 38) 		upPressed = false;
    else if(e.keyCode == 39) 	rightPressed = false;
    else if(e.keyCode == 37) 	leftPressed = false;
    else if(e.keyCode == 40) 	downPressed = false;
    else if(e.keyCode == 32) 	spacePressed = false;
}

function hero(size, speed, maxLife){
	this.size = size;
	this.width = size[0];
	this.height = size[1];
	this.xPosition = null;
	this.yPosition = null;
	this.speed = speed;
	this.maxLife = maxLife;
	this.currLife = null;
	this.direction = null;
	this.damageCool = null;
	this.attack = null;
	this.attackCool = null;
	this.graphic = null;
}
hero.prototype.appear = function(stage1, startingX, startingY){
	this.graphic = new createjs.Shape();
	this.graphic.fillCmd = this.graphic.graphics.beginFill("#333333").command;
	this.graphic.graphics.drawRect(0, 0, this.width, this.height);
	this.xPosition = startingX;
	this.yPosition = startingY;
	this.graphic.x = this.xPosition;
	this.graphic.y = this.yPosition;
	this.direction = 1;
	this.currLife = this.maxLife;
	this.damageCool = 0;
	this.attack = false;
	this.attackCool = 0;
	stage1.addChild(this.graphic);
	return this.graphic;
}
hero.prototype.disappear = function(stage1){
	stage1.removeChild(this.graphic);
	this.xPosition = null;
	this.yPosition = null;
	this.currLife = null;
	this.direction = null;
	this.damageCool = null;
	this.attack = null;
	this.attackCool = null;
	this.graphic = null;
}

function enemy(size, yPosition, xRange, speed, maxLife){
	this.size = size
	this.width = size[0];
	this.height = size[1];
	this.xPosition = null;
	this.yPosition = yPosition;
	this.xRange = xRange;
	this.speed = speed;
	this.maxLife = maxLife;
	this.currLife = null;
	this.direction = null;
	this.graphic = null;
}
enemy.prototype.appear = function(stage1){
	this.graphic = new createjs.Shape();
	this.graphic.fillCmd = this.graphic.graphics.beginFill("#333333").command;
	this.graphic.graphics.drawRect(0, 0, this.width, this.height);
	this.xPosition = Math.random() * (this.xRange[1] -  this.xRange[0]) + this.xRange[0];
	this.graphic.x = this.xPosition;
	this.graphic.y = this.yPosition;
	this.direction = Math.floor(Math.random() * 2) * 2 - 1;
	this.currLife = this.maxLife;
	stage1.addChild(this.graphic);
	return this.graphic;
}
enemy.prototype.disappear = function(stage1){
	stage1.removeChild(this.graphic);
	this.direction = null;
	this.currLife = null;
	this.graphic = null;
}


function placeEnemiesOnMap(stage, enemynum) {
	var yscope = (stage.canvas.height) / enemynum;
	var yPos = yscope/2;
	for (var j = 0; j < enemynum; j++) {
		var xleft = Math.random() * (stage.canvas.width/3);
		var xright = Math.random() * (stage.canvas.width/2) + stage.canvas.width/2;
		var monster = new enemy([50, 50], yPos, [xleft, xright], 1, 500);
		monster.appear(stage);
		allEnemies.push(monster);
		yPos+= yscope;
	}
}


//complex enemy
function complexEnemy(yPosition, xRange, speed){
	this.yPosition = yPosition;
	this.xRange = xRange;
	this.speed = speed;
	this.direction = null;
	this.graphic = null;
}
complexEnemy.prototype.appear = function(stage1){
	this.graphic = new createjs.Container();
    
    var ehead = new createjs.Shape();
    var ebody = new createjs.Shape();
    var eye1 = new createjs.Shape();
	var eye2 = new createjs.Shape();
    ehead.graphics.beginFill("white").beginStroke("gray").drawCircle(0,0,25);
    ebody.graphics.beginFill("white").beginStroke("gray").drawRect(0,0,50,70);
    eye1.graphics.beginFill("white").beginStroke("black").drawCircle(0,0,7)
    eye2.graphics.beginFill("white").beginStroke("black").drawCircle(0,0,7)
	
	ebody.x = -25;
	eye1.x = -10;
	eye2.x = 10;
	
	this.graphic.addChild(ebody);
	this.graphic.addChild(ehead);
	this.graphic.addChild(eye1);
	this.graphic.addChild(eye2);
	this.graphic.setBounds(0, 0, 75, 120);
	this.graphic.x = Math.random() * (this.xRange[1] -  this.xRange[0]) + this.xRange[0];
	this.graphic.y = this.yPosition;
	this.direction = Math.floor(Math.random() * 2) * 2 - 1;
	stage1.addChild(this.graphic);
	return this.graphic;
}
complexEnemy.prototype.disappear = function(stage1){
	stage1.removeChild(this.graphic);
	this.direction = null;
	this.graphic = null;
}

function bound(x, y, w, h){
	this.xPosition = x;
	this.yPosition = y;	
	this.width = w;
	this.height = h;
}

function checkCollision(obj1, obj2) {
	var checkX, checkY
    if(obj1.xPosition <= obj2.xPosition)	{if(obj1.width >= obj2.xPosition - obj1.xPosition) checkX = true;}
    else if(obj1.xPosition > obj2.xPosition){if(obj2.width >= obj1.xPosition - obj2.xPosition) checkX = true;}
    if(obj1.yPosition <= obj2.yPosition)	{if(obj1.height >= obj2.yPosition - obj1.yPosition) checkY = true;}
    else if(obj1.yPosition > obj2.yPosition){if(obj2.height >= obj1.yPosition - obj2.yPosition) checkY = true;}
    if(checkX && checkY) return true;
    else return false;
}

function heroControl(hero){
	ds = hero.speed;
    if(upPressed && hero.yPosition-ds > 0) 							hero.yPosition -= ds;
    if(rightPressed && hero.xPosition+ds < canvas.width-hero.width) hero.xPosition += ds;
    if(leftPressed && hero.xPosition-ds > 0) 						hero.xPosition -= ds;
    if(downPressed && hero.yPosition+ds < canvas.height-hero.height)hero.yPosition += ds;

    if(rightPressed && hero.xPosition+ds < canvas.width-hero.width)	hero.direction = 1;
    if(leftPressed && hero.xPosition-ds > 0)						hero.direction = -1;

    if(hero.attack){
    	hero.attack = false;
    }

    if(hero.attackCool==0){
    	if(spacePressed){
	    	hero.attack = true;
			hero.attackCool = 1;
			console.log(hero.direction);
		}
    }
    else if(hero.attackCool == 20){
    	hero.attackCool = 0;
    }
    else{
    	hero.attackCool += 1;
    }

    var attackTimer = hero.attackCool;
    var skewAmount
    var skewRad
    if(attackTimer<15 && attackTimer){
    	skewScale = 15;
    }
    else skewScale = 0;
    hero.graphic.skewX= skewScale * hero.direction;
    skewRad = skewScale*hero.direction*Math.PI/180;
    hero.graphic.x = hero.xPosition + hero.height * Math.sin(skewRad);
    hero.graphic.y = hero.yPosition + hero.height * (1 - Math.cos(skewRad));
}

function enemyMove(enemy){
	if(enemy.xPosition <= enemy.xRange[0])			enemy.direction = 1;
	else if(enemy.xPosition >= enemy.xRange[1]) 	enemy.direction = -1;
	enemy.xPosition += enemy.direction * enemy.speed;
	enemy.graphic.x = enemy.xPosition;
}

function tick(event) {
	heroControl(hero1);
	if(hero1.direction == 1)	heroAttackBound.xPosition = hero1.xPosition;
	else 					heroAttackBound.xPosition = hero1.xPosition - 50;
	heroAttackBound.yPosition = hero1.yPosition;

	if(enemy6.graphic){
		enemyMove(enemy6);

		if (checkCollision(hero1, enemy6)) {
			if (hero1.damageCool >= 50) {
				if (hero1.currLife <= 20)	hero1.currLife = 0;
				else 						hero1.currLife-=20;
				hero1.damageCool = 0;
			}
		}
		if (checkCollision(heroAttackBound, enemy6) && hero1.attack) {
			if (enemy6.currLife <= 20)	enemy6.currLife = 0;
			else 						enemy6.currLife-=200;
		}

		if (enemy6.currLife < 500) {
			enemy6.graphic.fillCmd.style = "#BF0000";
		}

		if (enemy6.currLife <= 0) {
			enemy6.disappear(stage);
		}
	}

	for (var i = 0; i < allEnemies.length; i++) {
		var en = allEnemies[i];
		enemyMove(en);

		if (checkCollision(hero1, en)) {
			if (hero1.damageCool >= 50) {
				if (hero1.currLife <= 20)	hero1.currLife = 0;
				else 						hero1.currLife-=20;
				hero1.damageCool = 0;
			}
		}
		if (checkCollision(heroAttackBound, en) && hero1.attack) {
			heroScore += 20;
			drawScoreCount();

			if (en.currLife <= 20)	
				en.currLife = 0;
			else 						
				en.currLife-=200;
		}

		if (en.currLife < 500) {
			en.graphic.fillCmd.style = "#BF0000";
		}

		if (en.currLife <= 0) {
			for (var j = 0; j < allEnemies.length; j++) {
				if (allEnemies[j] === en)
					allEnemies.splice(i, 1);
			}
			en.disappear(stage);
		}

	}



	if (hero1.currLife <= 0) {
		stage.removeAllChildren();
		stage.update();
		createjs.Ticker.removeAllEventListeners();
		console.log("sent");
		var done = false

		// $.ajax({
		// 	type: 'POST',
		// 	dataType: "json",
		// 	data: {
		// 		newScore: heroScore
		// 	},
	 //        dataType: 'application/json',
  //           url: 'http://localhost:8080/changeScore',						
  //           success: function(data) {
  //               console.log('success');
  //               done = true;
  //               gameOver();
  //           }
  //       });
        gameOver();
	}

	hero1.damageCool++;
	drawLifeGage();

	if (hero1.currLife < 119)	hero1.currLife+=0.002;

	stage.update();
}