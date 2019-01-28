"use strict";

let si;
let spaceship;
let bg;

function setup(){
    let canvas = document.getElementById("siCanvas");
    si = canvas.getContext("2d");
    preload();
    addEventListener("mouseover",function(event){
        
    });
    draw();
}

function preload(){
    bg = new Image();
    bg.src = "vi9s3k.gif";
}

function draw(){
    si.speed = 0;
    drawBG();
}

function drawBG(){
    
}

function drawShip(){
    
    si.save();
    si.beginPath();
    
}