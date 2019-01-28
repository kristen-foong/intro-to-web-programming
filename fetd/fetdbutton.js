"use strict";

var spawnCounter = 0;
var spawnInterval = 1000;
var tileSize = 60;

let td;
var timer;
var fps = 60;
let wave = 0;
var lives = 50;
var img = new Image();
img.src = "jeorge.png";

var waveEnemies = [
	10, 20, 20
];
var enemiesSpawned = 0;

//tower Array
var towerArr = [];

//enemy path
var waypointArr = new Array(10);

//grid is 840 x 780; each square is 60px
waypointArr[0] = {x: 0, y: 0};
waypointArr[1] = {x: 720, y: 0};
waypointArr[2] = {x: 720, y: 540};
waypointArr[3] = {x: 240, y: 540};
waypointArr[4] = {x: 240, y: 360};
waypointArr[5] = {x: 540, y: 360};
waypointArr[6] = {x: 540, y: 180};
waypointArr[7] = {x: 60, y: 180};
waypointArr[8] = {x: 60, y: 720};
waypointArr[9] = {x: 840, y: 720};

//dividing map into pieces
var mapArr = new Array(14);

//creates 2d array for grid
for(let i = 0; i < mapArr.length; i++){
	mapArr[i] = new Array(13);
}

//fills grid with tiles
for(let i = 0; i < mapArr.length; i++){
	for(let j = 0; j < mapArr[i].length; j++){
		mapArr[i][j] = new Tile(false, true);
	}
}

//makes path unbuildable idk man
for(let i = 0; i < waypointArr.length - 1; i++){
	let start = waypointArr[i];
	let end = waypointArr[i + 1];

	let xDist = (end.x - start.x);
	let yDist = (end.y - start.y);

	let xStep = xDist / Math.max(Math.abs(xDist), Math.abs(yDist));
	let yStep = yDist / Math.max(Math.abs(xDist), Math.abs(yDist));

	let xCoord = start.x;
	let yCoord = start.y;

	while(xCoord != end.x || yCoord != end.y){
		let x = Math.floor(xCoord/tileSize);
		let y = Math.floor(yCoord/tileSize);

		mapArr[x][y].canBuild = false;

		xCoord += xStep;
		yCoord += yStep;
	}
}

function Tile(hasTower, canBuild){
	this.hasTower = hasTower;
	this.canBuild = canBuild;
}

//create enemy list
var enemyArr = new Array(15);

function Enemy(){
	this.hp = 50;
	this.x = waypointArr[0].x;
	this.y = waypointArr[0].y;
	this.waypoint = 1;
}

for(let i = 0; i < enemyArr.length; i++){
    enemyArr[i] = new Enemy();
}

function setup(){
  let canvas = document.getElementById("tdCanvas");
    td = canvas.getContext("2d");
    timer = setInterval(function(){gameLoop()}, 1000/fps);

}

function gameLoop(){
    update();
    draw();
}

function moveRight(i){
        enemyArr[i].x += 1;
}

function moveLeft(i){
        enemyArr[i].x -= 1;
}

function moveUp(i){
        enemyArr[i].y -= 1;
}

function moveDown(i){
        enemyArr[i].y += 1;
}

function update(){
	if(spawnCounter >= spawnInterval) {
		if(waveEnemies[wave] > enemiesSpawned) {
			enemyArr.push({
	      HP: "50",
	      x: waypointArr[0].x,
	      y: waypointArr[0].y,
	      waypoint: 1
	    });
			enemiesSpawned++;
			spawnCounter -= spawnInterval;
		} else {
			spawnInterval = 300000;
			wave++;
		}
	}
	spawnCounter += 1000/fps;

  //updates waypoint
    for(let i = 0; i < enemyArr.length; i++){
        if (enemyArr[i].x == waypointArr[enemyArr[i].waypoint].x && enemyArr[i].y == waypointArr[enemyArr[i].waypoint].y){
            enemyArr[i].waypoint++;

            if(enemyArr[i].waypoint == 10){
                enemyArr[i].x = -60;
                enemyArr[i].y = 0;
                enemyArr[i].waypoint = 1;
								lives--; //if enemy reaches end of path, take away a life
                }
            }

        //horizontal movement
        if (enemyArr[i].x > waypointArr[enemyArr[i].waypoint].x){
            moveLeft(i);
        } else if(enemyArr[i].x < waypointArr[enemyArr[i].waypoint].x){
            moveRight(i);
        }

        //vertical movement
        if(enemyArr[i].y > waypointArr[enemyArr[i].waypoint].y){
            moveUp(i);
        } else if(enemyArr[i].y < waypointArr[enemyArr[i].waypoint].y){
            moveDown(i);
        }
    }
}

function draw(){
    td.clearRect(0, 0, 840, 780);
	for(let i = 0; i < mapArr.length; i++) {
		for(let j = 0; j < mapArr[i].length; j++) {
			if(mapArr[i][j].canBuild) {
				td.fillStyle = "green";
			} else {
				td.fillStyle = "gray";
			}
			td.fillRect(i * 60, j * 60, (i + 1) * 60, (j + 1) * 60);
		}
	}
    for(let i = 0; i < enemyArr.length; i++){
			td.drawImage(img, enemyArr[i].x, enemyArr[i].y);
    	}
}

function createArrowTower(){
	let arrowTower = {
		atk: 2,
		range: 0
	};
	towerArr.push(arrowTower);
    make();
}

function createMagicTower(){
	let magicTower = {
		atk: 2,
		range: 0
	};
	towerArr.push(magicTower);
}




/* button js */

let CAN_MAKE = false;
let BUTTON_CLICKED = false;
let CANVAS_CLICKED = false;
let hits = 10;

let M_X = 0;
let M_Y = 0;

// checks if you can make a tower or not :/
function canMake(){
    console.log("canmake");
    if(hits == 10){
        CAN_MAKE = true;
    }
}

// draws the tower
function drawImg(){
    document.getElementById("tdCanvas").onclick = function(event){
        console.log("getcoord" + CANVAS_CLICKED);
        while(CANVAS_CLICKED){
            M_X = event.offsetX;
            M_Y = event.offsetY;
            console.log(M_X + "," + M_Y); 
            td.save();
            td.beginPath();
            td.drawImage(img,M_X,M_Y,60,80);
            td.restore();
            CANVAS_CLICKED = false;
        }
    }
}

// checks can make of each tower?
function make(){
    console.log("make");
    canMake();
    if(CAN_MAKE){
        document.getElementById("button1").onclick = t1();
    }
}

//tower 1
function t1(){
    console.log("t1");
    while(BUTTON_CLICKED == false){
        console.log("inclick");
        CANVAS_CLICKED = true;
        drawImg();
        BUTTON_CLICKED = true;
    }
    BUTTON_CLICKED = false;
}