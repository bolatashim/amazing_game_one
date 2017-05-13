// var canvas = document.getElementById("myCanvas");
// //var state = document.getElementById("myState");
// var ctx = canvas.getContext("2d");
// //var stateCtx = state.getContext("2d");

// var maxLife = 100;
// var life = 100;

// var heroHeight = 50;
// var heroWidth = 30;

// var heroX = (canvas.width-heroWidth)/2;
// var heroY = (canvas.height-heroHeight)/2;

// var upPressed = false;
// var rightPressed = false;
// var leftPressed = false;
// var downPressed = false;
// var spacePressed = false;

// var directionRight = true;
// var skew = 0;

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e) {
//     if(e.keyCode == 38) {
//         upPressed = true;
//     }
//     else if(e.keyCode == 39) {
//         rightPressed = true;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = true;
//     }
//     else if(e.keyCode == 40) {
//         downPressed = true;
//     }
//     else if(e.keyCode == 32) {
//     	spacePressed = true;
//     }
// }
// function keyUpHandler(e) {
//     if(e.keyCode == 38) {
//         upPressed = false;
//     }
//     else if(e.keyCode == 39) {
//         rightPressed = false;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = false;
//     }
//     else if(e.keyCode == 40) {
//         downPressed = false;
//     }
//     else if(e.keyCode == 32) {
//     	spacePressed = false;
//     }
// }

// function drawPlayerState(){
//     stateCtx.font = "16px Arial";
//     stateCtx.fillStyle = "#101010";
//     stateCtx.fillText("Life", 8, 20);
//     stateCtx.beginPath();
//     stateCtx.rect(37, 7, 82, 14);
//     stateCtx.strokeStyle = "#101010";
//     stateCtx.stroke();
//     stateCtx.closePath();
//     stateCtx.beginPath();
//     stateCtx.rect(37, 7, 70, 14);
//     stateCtx.fillStyle = "#101010";
//     stateCtx.fill();
//     stateCtx.closePath();
// }

// function drawhero() {
//     ctx.beginPath();
//     //ctx.transform(1, 0, 1/skew, 1, 0, 0);
//     ctx.setTransform(1, 0, 0, 1, 0, 0);
//     if(spacePressed){
// 	   if(directionRight){
// 	    	skew = 0.3;
// 	    }
// 	    else{
// 	    	skew = -0.3;
// 	    }
// 	}
// 	else{
// 	    //skew = 0;
// 	    if(skew > -0.01 && skew < 0.01	){
// 	    	skew = 0;
// 	    }
// 	    else{ 
// 		    if(skew > 0){
// 		    	skew -= 0.05;
// 		    }
// 		    else if(skew < 0){
// 		    	skew += 0.05;
// 		    }//*/
// 		}
// 	}
//     ctx.transform(1, 0, skew, 1, -skew * (heroY + heroHeight), 0);
//     ctx.rect(heroX, heroY, heroWidth, heroHeight);
//     ctx.fillStyle = "#333333";
//     ctx.fill();
//     ctx.closePath();
// }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     //drawPlayerState()
//     drawhero();
    
//     if(upPressed && heroY > 0) {
//         heroY -= 1;
//     }
//     if(rightPressed && heroX < canvas.width-heroWidth) {
//         heroX += 1;
//         directionRight = true;
//     }
//     if(leftPressed && heroX > 0) {
//         heroX -= 1;
//         directionRight = false;
//     }
//     if(downPressed && heroY < canvas.height-heroHeight) {
//         heroY += 1;
//     }
// }

// setInterval(draw, 10);