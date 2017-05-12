
//var canvas = ;
//var canvas = document.getElementById("amazingCanvas");
var ctx = $("#amazingCanvas")[0].getContext("2d");

function drawBall() {
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

drawBall();