var stage, output, hero, enemy1, enemy2, enemy3, enemy4, enemy5, guy, canvas, ctx;

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

	enemy1 = new createjs.Shape();
	enemy2 = new createjs.Shape();
	enemy3 = new createjs.Shape();
	enemy4 = new createjs.Shape();
	enemy5 = new createjs.Shape();

	enemy1.fillCmd = enemy1.graphics.beginFill("red").command;
	enemy2.fillCmd = enemy2.graphics.beginFill("red").command;
	enemy3.fillCmd = enemy3.graphics.beginFill("red").command;
	enemy4.fillCmd = enemy4.graphics.beginFill("red").command;
	enemy5.fillCmd = enemy5.graphics.beginFill("red").command;
	


	enemy1.graphics.drawRect(0, 0, 50, 70);
	enemy2.graphics.drawRect(0, 0, 50, 70);
	enemy3.graphics.drawRect(0, 0, 50, 70);
	enemy4.graphics.drawRect(0, 0, 50, 70);
	enemy5.graphics.drawRect(0, 0, 50, 70);


	enemy1.x = stage.canvas.width - 50;
	enemy2.x = stage.canvas.width - 50;
	enemy3.x = stage.canvas.width - 50;
	enemy4.x = stage.canvas.width - 50;
	enemy5.x = stage.canvas.width - 50;


	enemy1.y = stage.canvas.height - 100;
	enemy2.y = stage.canvas.height - 220;
	enemy3.y = stage.canvas.height - 340;
	enemy4.y = stage.canvas.height - 460;
	enemy5.y = stage.canvas.height - 580;

	enemy3.setBounds(enemy3.x, enemy3.y, 50, 70);
	hero.setBounds(hero.x, hero.y, 30, 50);

	stage.addChild(enemy1);
	stage.addChild(enemy2);
	stage.addChild(enemy3);
	stage.addChild(enemy4);
	stage.addChild(enemy5);
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

	enemy2.on("click", function(event){
		enemy2.fillCmd.style = "green";
		console.log("clicked");
		stage.update(event);
	});
	enemy3.on("click", function(event){
		enemy3.fillCmd.style = "green";
		console.log("clicked");
		stage.update(event);
	});
	enemy4.on("click", function(event){
		enemy4.fillCmd.style = "green";
		console.log("clicked");
		stage.update(event);
	});
	enemy5.on("click", function(event){
		enemy5.fillCmd.style = "green";
		console.log("clicked");
		stage.update(event);
	});
}

function keyDownHandler(e) {
    if(e.keyCode == 38) {
        upPressed = true;
    }
    else if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 40) {
        downPressed = true;
    }
    else if(e.keyCode == 32) {
    	spacePressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 38) {
        upPressed = false;
    }
    else if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 40) {
        downPressed = false;
    }
    else if(e.keyCode == 32) {
    	spacePressed = false;
    }
}

function adjustBounds(obj) {
	obj.setBounds(obj.x, obj.y, 50, 70);
}

function checkCollision(rect1, rect2) {
    if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
    return true;
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
	enemy2.x += direction;
	enemy3.x += direction;
	enemy4.x += direction;
	enemy5.x += direction;

	if (enemy1.x < 0) { 
		direction = rightMotion;
		fightDirChange();
	}
	if (enemy1.x > stage.canvas.width) { 
		direction = leftMotion;
		fightDirChange();
	}		

	adjustBounds(hero);
	adjustBounds(enemy3);
	var bound1 = hero.getBounds();
	var bound2 = enemy3.getBounds();


	if (checkCollision(bound1, bound2)) {
		console.log("collision enemy3 and hero");

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
