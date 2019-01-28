"use strict";
let ctx;

let MOUSE_POS_X = 300;
let MOUSE_POS_Y = 300;
let MOUSE_ROTATION = 0;
let CHEESE_POS_X;
let CHEESE_POS_Y;

function setup() {
	ctx = document.getElementById("surface").getContext("2d");
    draw();
    
    addEventListener("keydown", function(event){
        if(event.keyCode == 37){
            MOUSE_POS_X -= 10;
            MOUSE_ROTATION =  rotation(MOUSE_POS_X,MOUSE_POS_Y,CHEESE_POS_X,CHEESE_POS_Y);
        }
        if(event.keyCode == 38){
            MOUSE_POS_Y -= 10;
            MOUSE_ROTATION =  rotation(MOUSE_POS_X,MOUSE_POS_Y,CHEESE_POS_X,CHEESE_POS_Y);
        }
        if(event.keyCode == 39){
            MOUSE_POS_X += 10;
            MOUSE_ROTATION =  rotation(MOUSE_POS_X,MOUSE_POS_Y,CHEESE_POS_X,CHEESE_POS_Y);
        }
        if(event.keyCode == 40){
            MOUSE_POS_Y += 10;
            MOUSE_ROTATION =  rotation(MOUSE_POS_X,MOUSE_POS_Y,CHEESE_POS_X,CHEESE_POS_Y);
        }
        ctx.clearRect(0,0,600,600);
        let checkCoord = (Math.pow((CHEESE_POS_X - MOUSE_POS_X),2) + Math.pow((CHEESE_POS_Y - MOUSE_POS_Y),2))**.5;
        if(checkCoord <= 15){
            drawMouse(MOUSE_POS_X, MOUSE_POS_Y, MOUSE_ROTATION); 
            CHEESE_POS_X = undefined;
            CHEESE_POS_Y = undefined;
        }else{      drawCheese(CHEESE_POS_X,CHEESE_POS_Y);
            drawMouse(MOUSE_POS_X, MOUSE_POS_Y, MOUSE_ROTATION);            
        }     
    });
    
}

function cheesePos(){
    
    CHEESE_POS_X = event.offsetX;
    CHEESE_POS_Y = event.offsetY;
    
}


function draw() {
    ctx.clearRect(0,0,600,600);
    
    cheesePos();
    
    MOUSE_ROTATION = rotation(MOUSE_POS_X,MOUSE_POS_Y,CHEESE_POS_X,CHEESE_POS_Y);
    drawMouse(MOUSE_POS_X,MOUSE_POS_Y,MOUSE_ROTATION);
    
    if(CHEESE_POS_X != undefined){
        drawCheese(CHEESE_POS_X,CHEESE_POS_Y);
    }
}


function rotation(xFrom, yFrom, xTo, yTo) {
	return Math.atan((yTo-yFrom) / (xTo - xFrom)) + (xTo < xFrom ?Math.PI:0);
}


function drawCheese(x,y) {
	ctx.save();
	ctx.translate(x,y);
	
	ctx.beginPath();
	ctx.fillStyle="yellow";
	ctx.lineTo(-30,20);
	ctx.lineTo(20,0);
	ctx.lineTo(-30,-20);
	ctx.lineTo(-30,20);	
	ctx.fill();
	
	ctx.fillStyle="orange";
	ctx.beginPath();
	ctx.arc(2,1,4,0,2*Math.PI);
	ctx.fill();
	
	ctx.beginPath();	
	ctx.arc(-18,6,4,0,2*Math.PI);	
	ctx.fill();
	
	ctx.beginPath();	
	ctx.arc(-10,-5,4,0,2*Math.PI);		
	ctx.fill();
	
	ctx.beginPath();	
	ctx.arc(-24,-6,4,0,2*Math.PI);		
	ctx.fill();	
	ctx.restore();
}

function drawMouse(x,y,rotate) {
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(rotate);
	
	ctx.beginPath();
	ctx.arc(0,0,2,0,2*Math.PI);
	ctx.fill();
	
	ctx.beginPath();
	ctx.lineTo(0,0);
	ctx.lineTo(-20,10);
	ctx.lineTo(-20,-10);
	ctx.lineTo(0,0);
	ctx.stroke();
	ctx.fillStyle="white";
	
	ctx.beginPath();
	ctx.arc(-20,-10,5,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(-20,10,5,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();	
	
	ctx.fillStyle="black";
	ctx.beginPath();
	ctx.arc(-14,-4,2,0,2*Math.PI);
	ctx.fill();	
	
	ctx.beginPath();
	ctx.arc(-14,4,2,0,2*Math.PI);
	ctx.fill();	

	ctx.beginPath();
	ctx.lineTo(-4,-2);
	ctx.lineTo(-4,-10);
	ctx.lineTo(-4,-2);
	ctx.lineTo(0,-8);
	ctx.lineTo(-4,-2);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.lineTo(-4,2);
	ctx.lineTo(-4,10);
	ctx.lineTo(-4,2);
	ctx.lineTo(0,8);
	ctx.lineTo(-4,2);
	ctx.stroke();	
	ctx.restore();
}
