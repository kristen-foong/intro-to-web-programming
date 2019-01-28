"use strict";
let ctx;
let OWIDTH = 400;
let OHEIGHT = 200;

function setup(){
    let canvas = document.getElementById("oolimpycCanvas");
    ctx = canvas.getContext("2d");
    
    drawRings();
}

function drawRings(){
    /* blue circle */
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "blue";
    ctx.arc(80,130,50,0,2*Math.PI);
    ctx.stroke();
    ctx.restore();
    
    /* green circle */
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "darkgreen";
    ctx.arc(140,70,50,0,2*Math.PI);
    ctx.stroke();
    ctx.restore();
    
    /* blue overlap */
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "blue";
    ctx.arc(80,130,50,0,1.8*Math.PI);
    ctx.stroke();
    ctx.restore();
    
    /* black circle */
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.arc(200,130,50,0,2*Math.PI);
    ctx.stroke();
    ctx.restore();
    
    /* green overlap */
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "darkgreen";
    ctx.arc(140,70,50,0,0.3*Math.PI);
    ctx.stroke();
    ctx.restore();
    
    /* yellow circle */
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "yellow";
    ctx.arc(260,70,50,0,2*Math.PI);
    ctx.stroke();
    ctx.restore();
    
    /* black overlap */
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.arc(200,130,50,0,1.8*Math.PI);
    ctx.stroke();
    ctx.restore();
    
    /* red circle */
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "red";
    ctx.arc(320,130,50,0,2*Math.PI);
    ctx.stroke();
    ctx.restore();
    
    /* yellow overlap */
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "yellow";
    ctx.arc(260,70,50,0,0.3*Math.PI);
    ctx.stroke();
    ctx.restore();
}

function degreesToRadians(degrees){
    let radians = degrees*Math.PI/180;
    return radians;
}

function radiansToDegrees(radians){
    let degrees = radians * 180 / Math.PI;
    return degrees;
}

function drawColorWheel(){
    let canvas = document.getElementById("circleCanvas");
    let col = canvas.getContext("2d");
    
    col.clearRect(0,0,800,800);
    
    let num =  +document.getElementById("colorCount").value;

    if(num > 0){
        let radians = 2*Math.PI/num;
        let degrees = radiansToDegrees(radians);
        let angle = 1.5*Math.PI - (radians/2);
        
        for(let i = 0; i < num; i++){
            col.save();
            col.beginPath();
            col.strokeStyle = "hsl(" + (degrees*i) + ",100%,50%)";
            col.fillStyle = "hsl(" + (degrees*i) + ",100%,50%)";
            let start = angle + radians*i;
            let end = angle + radians*(i+1);
            col.arc(400,400,300,start,end);
            col.lineTo(400,400);
            col.stroke();
            col.fill();
            col.restore();
        }
    }
    
}