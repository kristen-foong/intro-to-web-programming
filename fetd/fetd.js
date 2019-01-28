"use strict";

var spawnCounter = 0;
var spawnInterval = 1000;
var tileSize = 60;

let td;
var timer;
var fps = 60;
let wave = 0;
var lives = 50;
var gold = 1000;
let x;
let y;
var soldier = new Image();
soldier.src = "images/test.png";

var archer = new Image();
archer.src = "images/jeorge.png";

var grass = new Image();
grass.src = "images/grassTile.png";

var path = new Image();
path.src = "images/pathTile.png";

let BUTTON_CLICKED = false;
let CANVAS_CLICKED = false;
let M_X;
let M_Y;




var waveEnemies = [
	10, 20, 20
];
var enemiesSpawned = 0;

//tower Array
var towerArr = [];
//projectile array
var projectileArr = [];

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
		mapArr[i][j] = new Tile(false, true, i, j, "grass");
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
		x = Math.floor(xCoord/tileSize);
		y = Math.floor(yCoord/tileSize);

		mapArr[x][y].canBuild = false;
		mapArr[x][y].type = "tile";

		xCoord += xStep;
		yCoord += yStep;
	}
}

function Tile(hasTower, canBuild, x, y, type){
	this.hasTower = hasTower;
	this.canBuild = canBuild;
	this.x = x;
	this.y = y;
	this.type = type;
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
    document.getElementById("gold").innerHTML = "gold: $" + gold;
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
			if(mapArr[i][j].type == "grass") {
				td.drawImage(grass, i * tileSize, j * tileSize);
			} else {
				td.drawImage(path, i * tileSize, j * tileSize);
			}
		}
	}

  for(let i = 0; i < enemyArr.length; i++){
		td.drawImage(soldier, enemyArr[i].x, enemyArr[i].y);
    }

	for(let i = 0; i < towerArr.length; i++){
		td.drawImage(archer, towerArr[i].x * tileSize, towerArr[i].y * tileSize);
        drawProjectile(projectileArr[i].x, projectileArr[i].y);
        //projectile?
        let dist = getDist((enemyArr[i].x*tileSize - towerArr[i].x*tileSize), (enemyArr[i].y*tileSize -towerArr[i].y*tileSize)); 
        if(dist > 0){
            rotation(towerArr[i].x, towerArr[i].y, enemyArr[i].x, enemyArr[i].y);
            projectileArr[i].x -= 5;
            projectileArr[i].y -= 5;
        }else{
            projectileArr[i].x = towerArr[i].x;
            projectileArr[i].y = towerArr[i].y;
        }
    }
}

function arrowTower(x, y){
	this.atk = 2;
	this.range = 3;
	this.cost = 20;
	this.x = 0;
	this.y = 0;
}

function createArrowTower(){
	var tower = new arrowTower(mapArr[M_X], mapArr[M_Y]);
    CANVAS_CLICKED = true;
    document.getElementById("tdCanvas").onclick = function(event){
        M_X = Math.floor(event.offsetX / 60);
        M_Y = Math.floor(event.offsetY / 60);
        if (CANVAS_CLICKED && gold >= tower.cost && mapArr[M_X][M_Y].canBuild == true){
            console.log(M_X + "," + M_Y);
            tower.x = M_X;
            tower.y = M_Y;
            towerArr.push(tower);
            gold = gold - tower.cost;
            document.getElementById("gold").innerHTML = "gold: $" + gold;
            CANVAS_CLICKED = false;
            mapArr[M_X][M_Y].canBuild = false;
            projectile.x = M_X*60;
            projectile.y = M_Y*60;
            projectileArr.push(projectile);
        } else {
            CANVAS_CLICKED = false;
        }
	}
}

function createMagicTower(){
	let magicTower = {
		atk: 2,
		range: 0,
		cost: 25
	};
	towerArr.push(magicTower);
}

function drawProjectile(x,y){
    td.save();
    td.beginPath();
    td.arc(x+20,y+20,5,0,2*Math.PI);
    td.fillStyle = "black";
    td.fill();
}

function getDist(x,y){
    return Math.sqrt(x*x + y*y);
}

function projectile(x,y){
    this.x = x;
    this.y = y;
}

function rotation(xFrom, yFrom, xTo, yTo) {
	return Math.atan((yTo-yFrom) / (xTo - xFrom)) + (xTo < xFrom ?Math.PI:0);
}
