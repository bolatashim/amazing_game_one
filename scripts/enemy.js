
/*
var canvas = $("#amazingCanvas")[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var triPos = [];

var enemynum = 0;

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}




function initializeTri() {
	for (var i = 0; i < 20; i++) {
		var posx = getRandomInt(0, 1280);
		var posy = getRandomInt(0, 800);
		triPos.push({posx: posx, posy: posy, active: 1});
	}
}


function drawAllTriangles() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < triPos.length; i++) {
		var tring = triPos[i];
		
		var angle = Math.random() * 2 * Math.PI;

		var dx =  Math.cos(angle);
		var dy =  Math.sin(angle);

		if (tring.active == 1) {
			drawTriangle(tring.posx + dx, tring.posy + dy);
			triPos[i].posx += dx;
			triPos[i].posy += dy;
		}
	}
}

function drawTriangle(posx, posy) {
  ctx.beginPath();
  ctx.moveTo(posx, posy);
  ctx.lineTo(posx + 20, posy - 40);
  ctx.lineTo(posx + 40, posy);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// function drawOrNot() {

// 	if (enemynum < 20){
// 		drawTriangle();
// 	}
// }

initializeTri();
setInterval(drawAllTriangles, 1); */



//creating a stage

//Create a stage by getting a reference to the canvas
// var stage = new createjs.Stage("amazingCanvas");

var stage, output, enemy1, enemy2, enemy3, enemy4, enemy5, guy;

var leftMotion = -1;
var rightMotion = 1;
var direction = leftMotion;

function init() {
	stage = new createjs.Stage("amazingCanvas");

	guy = new createjs.Shape();
	guy.fillCmd = guy.graphics.beginFill("yellow").command;
	guy.graphics.drawRect(-25, -25, 50, 70);
	guy.x = 400;
	guy.y = 300;

	enemy1 = new createjs.Shape();
	enemy2 = new createjs.Shape();
	enemy3 = new createjs.Shape();
	enemy4 = new createjs.Shape();
	enemy5 = new createjs.Shape();

	// enemy1.graphics.append({exec: setDirectionState});
	enemy1.fillCmd = enemy1.graphics.beginFill("red").command;
	enemy2.fillCmd = enemy2.graphics.beginFill("red").command;
	enemy3.fillCmd = enemy3.graphics.beginFill("red").command;
	enemy4.fillCmd = enemy4.graphics.beginFill("red").command;
	enemy5.fillCmd = enemy5.graphics.beginFill("red").command;
	
	enemy1.graphics.drawRect(-25, -25, 50, 70);
	enemy2.graphics.drawRect(-25, -25, 50, 70);
	enemy3.graphics.drawRect(-25, -25, 50, 70);
	enemy4.graphics.drawRect(-25, -25, 50, 70);
	enemy5.graphics.drawRect(-25, -25, 50, 70);




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
	
	

	// var enemy1cont = new createjs.Container();
	// enemy1cont.x = stage.canvas.width - 50;
	// enemy1cont.y = stage.canvas.height - 400;

	// enemy1cont.addChild(enemy1);

	// enemy1.onMouseOver = handleMouseOver;

	enemy3.setBounds(enemy3.x, enemy3.y, 50, 70);
	guy.setBounds(guy.x, guy.y, 50, 70);


	stage.addChild(enemy1);
	stage.addChild(enemy2);
	stage.addChild(enemy3);
	stage.addChild(enemy4);
	stage.addChild(enemy5);
	stage.addChild(guy);

	// dragger.on("pressmove",function(evt) {
	// 	// currentTarget will be the container that the event listener was added to:
	// 	evt.currentTarget.x = evt.stageX;
	// 	evt.currentTarget.y = evt.stageY;
	// 	// make sure to redraw the stage to show the change:
	// 	stage.update();   
	// });

	// stage.addChild(enemy1);


	stage.update();

	createjs.Ticker.on("tick", tick); //executes tick every frame
	createjs.Ticker.setFPS();



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

function adjustBounds(obj) {
	obj.setBounds(obj.x, obj.y, 50, 70);
	// console.log(obj.getBounds().width);
}

function checkCollision(rect1, rect2) {
    if ( rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y ) return false;
    return true;
}

function tick(event) {
	// enemy1cont.x = enemy1cont.x - circleGuy;
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

	adjustBounds(enemy3);
	var bound1 = guy.getBounds();
	var bound2 = enemy3.getBounds();
	//if


	if (checkCollision(bound1, bound2)) {
		console.log("collision");
	}
	// if checkCollision(enemy3, guy) {
	// 	console.log("collision");
	// }
	//console.log("changes happending");
	// circle.x = circle.x + circleGuy;
	//if (dragger.x > stage.canvas.width) { circleGuy = leftMotion }
	stage.update(event); // important!!

	// console.log("timepasss");
}


// function setDirectionState(ctx, shape) {
// 	//console.log(shape.x);
// 	shape.fillCmd.style = shape.direction ? "red" : "black";
// 	//stage.update(ctx);

// }




function fightDirChange() {
	enemy1.direction = !enemy1.direction;
	console.log(enemy1.getBounds());
	enemy1.fillCmd.style = enemy1.direction ? "red" : "black";

	// if (dir < 0) {
	// 	//newenemy = new createjs.Shape().graphics.beginFill("blue").drawRect(enemy1.x, enemy1y, 50, 70);
	// 	//enemy1 = newenemy;
	// 	// var fill = new createjs.Graphics.Fill("blue");

	// 	enemy1.direction = !enemy1.direction;
	// }else{
	// 	// enemy1.fillStyle = "black";
	// 	enemy1.direction = !enemy1.direction;
	// }
	// enemy1.fill();
}






// //Create a Shape DisplayObject.
// var circle = new createjs.Shape();

// circle.graphics.beginFill("red").drawCircle(0, 0, 40);
// //Set position of Shape instance.
// circle.x = circle.y = 50;
// //Add Shape instance to stage display list.
// stage.addChild(circle);
// //Update stage will render next frame
// stage.update();


// circle.on("pressmove", function(evt) {
// 		console.log("pressmove");
//     evt.target.x = evt.stageX;
//     evt.target.y = evt.stageY;
// });
// circle.on("pressup", function(evt) { console.log("up"); })

// circle.addEventListener("click", handleClick);

// function handleClick(event){
//    // Click happenened
//    console.log("Handle click ");
// }

// circle.addEventListener("mousedown", handlePress);
// function handlePress(event) {
//    // A mouse press happened.
//    // Listen for mouse move while the mouse is down:
//    console.log("mouse down");
//    circle.addEventListener("mousemove", handleMove, false);
// }
// function handleMove(event) {
//    // Check out the DragAndDrop example in GitHub for more
//    console.log("drag mode");

// }





