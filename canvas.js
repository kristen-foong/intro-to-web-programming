"use strict";


let ctx;  



const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

let circX=100, circY=200;
let circW= 50, circH=0;
let rectXspeed=2;
let rectYspeed=4;
let animateInterval;


function setup() {
	let canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d"); 
	ctx.fillStyle="green";
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.beginPath();
    ctx.arc(circX,circY,circW,circH,2*Math.PI);
    ctx.closePath();
    ctx.fill();
}



function moveRight() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	ctx.beginPath();
	
	circX += 50;
	
	if (circX >= (CANVAS_WIDTH-circW)) {
		circX = CANVAS_WIDTH - circW;
	}
	
    ctx.arc(circX,circY,circW,circH,2*Math.PI);
    ctx.fill();
}


function moveLeft() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	ctx.beginPath();
	
	circX -= 50;
    
    ctx.arc(circX,circY,circW,circH,2*Math.PI);
    ctx.fill();
}


function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.beginPath();
	
	circX += rectXspeed;
	
	if (circX >= (CANVAS_WIDTH-circW)) {
		circX = CANVAS_WIDTH - circW;
		rectXspeed *= -1;
	}
	
	if (circX <= 0) {
		circX = 0;
		rectXspeed *= -1;
	}	
	
	
	circY += rectYspeed;
	if (circY >= CANVAS_HEIGHT-circH) {
		circY = CANVAS_HEIGHT-circH*2;
		rectYspeed *= -1;
	} else	if (circY <= 0) {
		circY = circH;
		rectYspeed *= -1;
	}		
	
    ctx.arc(circX,circY,circW,circH,2*Math.PI);
    ctx.fill();
	
}


function startAnimation() {
	animateInterval = setInterval(animate, 25);
	
}

function pauseAnimation() {
	clearInterval(animateInterval);
	
}







/*

	let canvas = document.getElementById("myCanvas");	
	ctx = canvas.getContext("2d");
	ctx.fillStyle="darkgreen"; 
	ctx.fillRect(rectX,rectY,100,100);




function startAnimation() {

}

function pauseAnimation() {

}


function animate() {
	ctx.clearRect(0,0,500,500);
	

	ctx.fillRect(rectX,rectY,100,100);	
}



	rectX += rectXspeed;
	if (rectX >= CANVAS_WIDTH-100) {
		rectX = CANVAS_WIDTH-100;
		rectXspeed *= -1;
	} else	if (rectX <= 0) {
		rectX = 0;
		rectXspeed *= -1;
	}

	rectY += rectYspeed;
	if (rectY >= CANVAS_HEIGHT-100) {
		rectY = CANVAS_HEIGHT-100;
		rectYspeed *= -1;
	} else	if (rectY <= 0) {
		rectY = 0;
		rectYspeed *= -1;
	}	
*/