/* group 1*/

"use strict";

let CHECK = false;
let C_X = 0;
let C_Y = 0;
let N_X = 0;
let N_Y = 0;

function setup(){
    ctx= document.getElementById("drawCanvas").getContext("2d");
    addEventListener("click",function(){
        click();
    });
}

function click(){
    if(!CHECK){
        CHECK = true;
    }else{
        CHECK = false;
    }
    drawCanvas.onclick = function(event){
        C_X = event.offsetX;
        C_Y = event.offsetY;
    }
    draw();
}

function draw(){
    
}