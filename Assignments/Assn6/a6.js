"use strict";

let ctx;
let colors = ['red','green','blue','purple','yellow','orange','pink'];

let peopleArray=[];

function setup() {
	ctx=document.getElementById("myCanvas").getContext("2d");
	for(let i = 0; i < 10; i++){
        let width = randomInteger(1,399);
        let height = randomInteger(50,200);
        let color = colors[randomInteger(0,7)];
        let checkBool = randomInteger(0,1);
        if(checkBool == 0){
            checkBool = false;
        }else{
            checkBool = true;
        }
        peopleArray.push([width, height, color, checkBool]);
    }
    draw();
}

function randomInteger(low,high) {
	return Math.floor(Math.random() * (1+high-low)) + low;
}

function draw(){
    ctx.save();
    ctx.clearRect(0,0,400,200);
    ctx.lineTo(0,0);
    ctx.lineTo(0,200);
    ctx.lineTo(400,200);
    ctx.lineTo(400,0);
    ctx.fillStyle = "black";
    ctx.fill();
    for(let i = 0; i < peopleArray.length; i++){
        drawPerson(peopleArray[i][0], peopleArray[i][1], peopleArray[i][2], peopleArray[i][3]);
    }
}

//Draws a person at position (x,y) which is bottom center
//color is a string setting the color
//if child is true, then a child is drawn (half sized person)
//An adult is 50 pixels tall, a child is 25
//An adult is 40 pixels wide, a child is 20
function drawPerson(x,y,color,child) {
	let height = 50;
	let halfWidth = 20;
	if (child) {
		height *= .5;
		halfWidth *= .5;
	}
	ctx.save();
	ctx.translate(x,y);
	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.lineTo(-halfWidth*.75,0);
	ctx.lineTo(0, -height/3);
	ctx.lineTo(halfWidth*.75,0);
	ctx.lineTo(0, -height/3);
	ctx.lineTo(0, -2*height/3);
	ctx.lineTo(0, -7*height/12);	
	ctx.lineTo(halfWidth,-2*height/3);
	ctx.lineTo(0, -7*height/12);	
	ctx.lineTo(-halfWidth,-2*height/3);		
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0,-5*height/6,height/6,0,2*Math.PI);
	ctx.stroke();
	
	ctx.restore();
}

function childLeft(){
    ctx.save();
    for(let i = 0; i < peopleArray.length; i++){
        ctx.beginPath();
        if(peopleArray[i][3]){
            if(peopleArray[i][0] > 20){
                peopleArray[i][0] -= 5;
            }
            draw();
        }
    }
    ctx.restore();
}

function childRight(){
    ctx.save();
    for(let i = 0; i < peopleArray.length; i++){
        ctx.beginPath();
        if(peopleArray[i][3]){
            if(peopleArray[i][0] < 380){
                peopleArray[i][0] += 5;
            }
            draw();
        }
    }
    ctx.restore();
}

function adultLeft(){
    ctx.save();
    for(let i = 0; i < peopleArray.length; i++){
        ctx.beginPath();
        if(!peopleArray[i][3]){
            if(peopleArray[i][0] > 25){
                peopleArray[i][0] -= 5;
            }
            draw();
        }
    }
    ctx.restore();
}

function adultRight(){
    ctx.save();
    for(let i = 0; i < peopleArray.length; i++){
        ctx.beginPath();
        if(!peopleArray[i][3]){
            if(peopleArray[i][0] < 375){
                peopleArray[i][0] += 5;
            }
            draw();
        }
    }
    ctx.restore();
}

