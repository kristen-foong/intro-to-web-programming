"use strict";

let ctx;
let colors = ['red','green','blue','purple','yellow','orange','pink'];

let peopleArray=[];

function Person(x,y,color,isChild){
    this.x = x;
    this.y = y;
    this.color = color;
    this.isChild = isChild;
    this.draw = function(){
        drawPerson(this.x, this.y, this.color, this.isChild);
    }
    this.moveLeft = function(){
        this.x -= 5;
    }
    this.moveRight = function(){
        this.x += 5;
    }
}

function setup() {
	ctx=document.getElementById("myCanvas").getContext("2d");
	for(let i = 0; i < 10; i++){
        let width = randomInteger(1,399);
        let height = randomInteger(50,200);
        let color = colors[randomInteger(0,6)];
        let checkBool = randomInteger(0,1);
        if(checkBool == 0){
            checkBool = false;
        }else{
            checkBool = true;
        }
        peopleArray.push(new Person(width, height, color, checkBool));
    }
    draw();
}

function randomInteger(low,high) {
	return Math.floor(Math.random() * (1+high-low)) + low;
}

function draw(){
    ctx.clearRect(0,0,400,200);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 200);
    for(let i = 0; i < peopleArray.length; i++){
        peopleArray[i].draw();
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
        if(peopleArray[i].isChild){
            peopleArray[i].moveLeft();
        }
    }
    draw();
    ctx.restore();
}

function childRight(){
    ctx.save();
    for(let i = 0; i < peopleArray.length; i++){
        ctx.beginPath();
        if(peopleArray[i].isChild){
            peopleArray[i].moveRight();
        }
    }
    draw();
    ctx.restore();
}

function adultLeft(){
    ctx.save();
    for(let i = 0; i < peopleArray.length; i++){
        ctx.beginPath();
        if(!peopleArray[i].isChild){
            peopleArray[i].moveLeft();
        }
    }
    draw();
    ctx.restore();
}

function adultRight(){
    ctx.save();
    for(let i = 0; i < peopleArray.length; i++){
        ctx.beginPath();
        if(!peopleArray[i].isChild){
            peopleArray[i].moveRight();
        }
    }
    draw();
    ctx.restore();
}

