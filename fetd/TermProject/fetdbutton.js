"use strict";

let td;

let t1_img;
let CAN_MAKE = false;
let BUTTON_CLICKED = false;
let CANVAS_CLICKED = false;
let hits = 10;

let M_X = 0;
let M_Y = 0;

function setup(){
    let canvas = document.getElementById("tdCanvas");
    td = canvas.getContext("2d");
    preload();
}

function preload() {
    t1_img = new Image();
    t1_img.src = "Anna_FEH_Sprite.png";
}

function canMake(){
    console.log("canmake");
    if(hits == 10){
        CAN_MAKE = true;
    }
}

function draw(){
    document.getElementById("tdCanvas").onclick = function(event){
        console.log("getcoord" + CANVAS_CLICKED);
        while(CANVAS_CLICKED){
            M_X = event.offsetX;
            M_Y = event.offsetY;
            console.log(M_X + "," + M_Y); 
            td.save();
            td.beginPath();
            td.drawImage(t1_img,M_X,M_Y,60,80);
            td.restore();
            CANVAS_CLICKED = false;
        }
    }
}

function make(){
    console.log("make");
    canMake();
    if(CAN_MAKE){
        document.getElementById("button1").onclick = t1();
    }
}

function t1(){
    console.log("t1");
    while(BUTTON_CLICKED == false){
        console.log("inclick");
        CANVAS_CLICKED = true;
        draw();
        BUTTON_CLICKED = true;
    }
    BUTTON_CLICKED = false;
}