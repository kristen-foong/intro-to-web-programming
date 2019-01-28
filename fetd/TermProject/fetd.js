"use strict";

var DEBUG_MODE = false;

var tileSize = 60;

var lastFrame = 0;
var frameCount = 0;
var secondCount = 0;

var alive = true;

let td;
var timer;
var fps = 0;
let wave = 1;
var lives = 50;
var gold = 50;
let x;
let y;

var bg = new Image();
bg.src = "images/bg.jpg";

var soldier = new Image();
soldier.src = "images/test.png";
var grass = new Image();
grass.src = "images/grassTile.png";
var path = new Image();
path.src = "images/pathTile.png";
var mage = new Image();
mage.src = "images/micaiahtest.png";
var archer = new Image();
archer.src = "images/innestest.png";
var snowflake = new Image();
snowflake.src = "images/snowflake.png";
var leaf = new Image();
leaf.src = "images/leaf.png";
var spark = new Image();
spark.src = "images/spark.png";
var azura = new Image();
azura.src = "images/azura.png";
var slowed = new Image();
slowed.src = "images/slowed.png";
var boss = new Image();
boss.src = "images/boss.png";
var pegasus = new Image();
pegasus.src = "images/tana.png";
var fire = new Image();
fire.src = "images/fire.png";
var burn = new Image();
burn.src = "images/burn.png";
var laegjarn = new Image();
laegjarn.src = "images/laegjarn.png";

let BUTTON_CLICKED = false;
let CANVAS_CLICKED = false;
let M_X;
let M_Y;

var waveEnemies = 15;
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
var enemyArr = [];

function Enemy(wave){
	this.hp = 30 * wave;
	this.x = waypointArr[0].x;
	this.y = waypointArr[0].y;
	this.waypoint = 1;
	this.gold = (Math.ceil(wave / 2));
	this.status = [];
	this.speed = 60;
	this.type = "enemy";
}

function Boss(wave){
	this.hp = 50 * wave;
	this.x = waypointArr[0].x;
	this.y = waypointArr[0].y;
	this.waypoint = 1;
	this.gold = wave;
	this.status = [];
	this.speed = 40;
	this.type = "boss";
}

function Pegasus(wave){
	this.hp = 30 * wave;
	this.x = waypointArr[0].x;
	this.y = waypointArr[0].y;
	this.waypoint = 1;
	this.gold = (Math.ceil(wave / 2));
	this.status = [];
	this.speed = 90;
	this.type = "pegasus";
}
var projectileArr = [];

function setup(){
  	let canvas = document.getElementById("tdCanvas");
    td = canvas.getContext("2d");
    //timer = setInterval(function(){gameLoop()}, 1000/fps);
    document.getElementById("gold").innerHTML = gold + "G";
		startScreen();
}

function startGame() {
	//td.shadowColor = "none";
	//td.shadowBlur = 0;

	window.requestAnimationFrame(gameLoop);
	document.getElementById("tdCanvas").removeEventListener("click", startGame);
}

function startScreen(){
    td.drawImage(bg,0,0);
    td.font = "70px 'fe'";
    td.fillStyle = "#F2D863";
    td.textAlign = "center";
    td.shadowColor = "black";
    td.shadowOffsetX = 0;
    td.shadowOffsetY = 0;
    td.shadowBlur = 25;
    td.fillText("Fire Emblem", 420,340);
    td.fillText("Tower Defense", 420, 400);
    td.font = "25px 'fe'";
    td.textAlign = "center";
    td.shadowColor = "black";
    td.shadowOffsetX = 0;
    td.shadowOffsetY = 0;
    td.shadowBlur = 5;
    td.fillText("(" + "click anywhere to play" + ")", 420,450);
		document.getElementById("tdCanvas").addEventListener("click", startGame);
}

function gameOver(){
    td.drawImage(bg,0,0);
    td.font = "70px 'fe'";
    td.fillStyle = "#F2D863";
    td.textAlign = "center";
    td.shadowColor = "black";
    td.shadowOffsetX = 0;
    td.shadowOffsetY = 0;
    td.shadowBlur = 25;
    td.fillText("Game Over", 420,340);
    td.fillText("Waves Survived:" + wave, 420, 400);
    td.font = "25px 'fe'";
    td.textAlign = "center";
    td.shadowColor = "black";
    td.shadowOffsetX = 0;
    td.shadowOffsetY = 0;
    td.shadowBlur = 5;
    td.fillText("Good Job!", 420,450);
		alive = false;
}

function gameLoop(timeStamp){
	let delta = (timeStamp - lastFrame) / 1000;
	secondCount += delta;

  update(delta);
  draw();

	frameCount++;
	if(secondCount >= 1) {
		fps = frameCount;
		frameCount = 0;
		secondCount -= 1;
	}
	lastFrame = timeStamp;
	if(alive){
		window.requestAnimationFrame(gameLoop);
	} else {
		gameOver();
	}
	document.getElementById("fps").innerHTML = "FPS: " + fps;
}

var spawnCounter = 0;
var spawnInterval = 1;

function update(delta){
	//spawns enemies and controls spawn timer for next wave
  if(waveEnemies > enemiesSpawned) {
		if(spawnCounter >= spawnInterval){
			if(wave % 5 == 0 && wave != 1){
				waveEnemies = 10;
				enemyArr.push(new Boss(wave));
			} else if (wave % 4 == 0 && wave != 1){
				waveEnemies = 20;
				enemyArr.push(new Pegasus(wave));
			} else {
				waveEnemies = 20;
				enemyArr.push(new Enemy(wave));
			}
			enemiesSpawned++;
			spawnCounter = 0;
			spawnInterval = 1;
		}
  } else if (waveEnemies == enemiesSpawned){
    enemiesSpawned++;
    spawnInterval = 90;
  } else if (enemyArr.length == 0){
		enemiesSpawned = 0;
		spawnInterval = 10;
		spawnCounter = 0;
		wave++;
        document.getElementById("wave").innerHTML = "Wave: " + wave;
	} else if (spawnCounter >= spawnInterval) {
		enemiesSpawned = 0;
		wave++;
        document.getElementById("wave").innerHTML = "Wave: " + wave;
	}
    document.getElementById("wave").innerHTML = "Wave: " + wave;
	spawnCounter += delta;

  //updates waypoint
    for(let i = 0; i < enemyArr.length; i++){
        if (calcDistance(enemyArr[i].x, enemyArr[i].y, waypointArr[enemyArr[i].waypoint].x, waypointArr[enemyArr[i].waypoint].y) < 2.5){
            enemyArr[i].waypoint++;

						enemyArr[i].x = toNearest(enemyArr[i].x, tileSize);
						enemyArr[i].y = toNearest(enemyArr[i].y, tileSize);

		        if(enemyArr[i].waypoint == 10){
		            enemyArr[i].x = -60;
		            enemyArr[i].y = 0;
		            enemyArr[i].waypoint = 1;
								lives--; //if enemy reaches end of path, take away a life
								document.getElementById("lives").innerHTML = "Lives: " + lives;
	          }
        }

				let speed = enemyArr[i].speed;

				//finds status effects on enemies
				for(let j = 0; j < enemyArr[i].status.length; j++){
					enemyArr[i].status[j].duration -= delta;
					if(enemyArr[i].status[j].duration <= 0){
						enemyArr[i].status.splice(j, 1);
					} else {
						if(enemyArr[i].status[j].name == "slowed"){
							speed /= 2;
						} else if (enemyArr[i].status[j].name == "burn"){
							enemyArr[i].hp -= 2 * delta;
						}
					}
				}

				//moves enemies
				let distance = {};
				distance.x = waypointArr[enemyArr[i].waypoint].x - enemyArr[i].x;
				distance.y = waypointArr[enemyArr[i].waypoint].y - enemyArr[i].y;
				let length = Math.sqrt(distance.x ** 2 + distance.y **2);
				let veeHat = {};
				veeHat.x = distance.x/length;
				veeHat.y = distance.y/length;
				veeHat.x = veeHat.x * speed * delta;
				veeHat.y = veeHat.y * speed * delta;
				enemyArr[i].x += veeHat.x;
				enemyArr[i].y += veeHat.y;
    }

		//finds enemies with 0 hp and gets rid of them
		for(let i = 0; i < enemyArr.length; i++){
			if(enemyArr[i].hp <= 0){
				for(let j = 0; j < towerArr.length; j++){
					if(towerArr[j].target == enemyArr[i]){
						towerArr[j].firing = false;
					}
				}
				gold += enemyArr[i].gold;
				document.getElementById("gold").innerHTML = gold + "G";
				enemyArr.splice(i, 1);
				i--;
			}
		}

		//finds closest enemy for each tower
		if(enemyArr.length > 0){
			for(let i = 0; i < towerArr.length; i++){
				let shortestDist = calcDistance(towerArr[i].x, towerArr[i].y, enemyArr[0].x, enemyArr[0].y);
				for(let j = 0; j < enemyArr.length; j++){
					let distance = calcDistance(towerArr[i].x, towerArr[i].y, enemyArr[j].x, enemyArr[j].y);
					if(distance <= shortestDist){
						shortestDist = distance;
						towerArr[i].target = enemyArr[j];
						towerArr[i].firing = true;
					}
				}
				//checks if enemy is in range of tower
				if (shortestDist <= towerArr[i].range * tileSize){
					let time = new Date().getTime();
					if(time - towerArr[i].lastFired >= towerArr[i].cd && towerArr[i].firing == true){
						if(towerArr[i].type == "arrow"){
							projectileArr.push(new arrowProjectile(towerArr[i].x, towerArr[i].y, towerArr[i].atk, towerArr[i].type, towerArr[i].target));
							towerArr[i].lastFired = time;
						} else if (towerArr[i].type == "magic"){
							projectileArr.push(new magicProjectile(towerArr[i].x, towerArr[i].y, towerArr[i].atk, towerArr[i].type, towerArr[i].target));
							towerArr[i].lastFired = time;
						} else if (towerArr[i].type == "ice"){
							projectileArr.push(new iceProjectile(towerArr[i].x, towerArr[i].y, towerArr[i].atk, towerArr[i].type, towerArr[i].target));
							towerArr[i].lastFired = time;
						} else if (towerArr[i].type == "fire"){
							projectileArr.push(new fireProjectile(towerArr[i].x, towerArr[i].y, towerArr[i].atk, towerArr[i].type, towerArr[i].target));
							towerArr[i].lastFired = time;
						}
					}
				}
			}
		}

		//updates projectile positions
		for(let i = 0; i < projectileArr.length; i++){
			let distance = {};
			distance.x = projectileArr[i].target.x - projectileArr[i].x;
			distance.y = projectileArr[i].target.y - projectileArr[i].y;
			let length = Math.sqrt(distance.x ** 2 + distance.y **2);
			let veeHat = {};
			veeHat.x = distance.x/length;
			veeHat.y = distance.y/length;
			veeHat.x = veeHat.x * projectileArr[i].speed * delta;
			veeHat.y = veeHat.y * projectileArr[i].speed * delta;
			projectileArr[i].x += veeHat.x;
			projectileArr[i].y += veeHat.y;
			let shortestDist = calcDistance(projectileArr[i].x, projectileArr[i].y, projectileArr[i].target.x, projectileArr[i].target.y);
			if(projectileArr[i].target == undefined){
				projectileArr.splice(i, 1);
			}
			if(shortestDist <= 7.5){
				projectileArr[i].target.hp -= projectileArr[i].atk;

				//refreshes slow duration
				if(projectileArr[i].type == "ice"){
					let found = false;
					for(let j = 0; j < projectileArr[i].target.status.length; j++){
						if(projectileArr[i].target.status[j].name == "slowed"){
							found = true;
							projectileArr[i].target.status[j].duration = 3;
						}
					}
					if(!found) {
						projectileArr[i].target.status.push(new Status("slowed",5));
					}
				} else if (projectileArr[i].type == "fire"){
						projectileArr[i].target.status.push(new Status("burn",5));
				}

				projectileArr.splice(i, 1);
			}
		}

		if(DEBUG_MODE) {
			document.getElementById("debug").innerHTML = "DEBUG LOG\n===============\n" +
             "spawnCounter: " + spawnCounter + "\n" +
             "spawnInterval: " + spawnInterval + "\n" +
             "enemiesSpawned: " + enemiesSpawned + "\n" +
             "waveEnemies: " + waveEnemies + "\n" +
             "wave: " + wave + "\n" +
             "enemyArr.length: " + enemyArr.length;
		}

	if(lives <= 0){
		alive = false;
	}
}

function draw(){
  td.clearRect(0, 0, 840, 780);
	for(let i = 0; i < mapArr.length; i++) {
        td.shadowColor="none";
        td.shadowBlur=0;
		for(let j = 0; j < mapArr[i].length; j++) {
			if(mapArr[i][j].type == "grass") {
				td.drawImage(grass, i * tileSize, j * tileSize);
			} else {
				td.drawImage(path, i * tileSize, j * tileSize);
			}
		}
        td.shadowColor = "black";
        td.shadowBlur = 5;
	}

  for(let i = 0; i < enemyArr.length; i++){
		if(enemyArr[i].type == "enemy"){
			td.drawImage(soldier, enemyArr[i].x, enemyArr[i].y);
		} else if (enemyArr[i].type == "boss"){
			td.drawImage(boss, enemyArr[i].x, enemyArr[i].y);
		} else if (enemyArr[i].type == "pegasus"){
			td.drawImage(pegasus, enemyArr[i].x, enemyArr[i].y);
		}
        td.shadowColor = "none";
        td.shadowBlur = 0;
		for(let j = 0; j < enemyArr[i].status.length; j++){
            if(enemyArr[i].status[j].name == "slowed"){
                td.drawImage(slowed, enemyArr[i].x, enemyArr[i].y);
            } else if (enemyArr[i].status[j].name == "burn"){
                td.drawImage(burn, enemyArr[i].x, enemyArr[i].y);
            }
        }
        td.shadowColor = "black";
        td.shadowBlur = 5;
    }

	for(let i = 0; i < towerArr.length; i++){
		if(towerArr[i].type == "arrow"){
				td.drawImage(archer, towerArr[i].x, towerArr[i].y);
			} else if (towerArr[i].type == "magic"){
				td.drawImage(mage, towerArr[i].x, towerArr[i].y);
		} else if (towerArr[i].type == "ice"){
			td.drawImage(azura, towerArr[i].x, towerArr[i].y);
		} else if (towerArr[i].type == "fire"){
			td.drawImage(laegjarn, towerArr[i].x, towerArr[i].y);
		}
	}

	for(let i = 0; i < projectileArr.length; i++){
		if(projectileArr[i].type == "arrow"){
			td.drawImage(leaf, projectileArr[i].x, projectileArr[i].y);
		} else if (projectileArr[i].type == "magic"){
			td.drawImage(spark, projectileArr[i].x, projectileArr[i].y);
		} else if (projectileArr[i].type == "ice"){
		td.drawImage(snowflake, projectileArr[i].x, projectileArr[i].y);
	} else if (projectileArr[i].type == "fire"){
		td.drawImage(fire, projectileArr[i].x, projectileArr[i].y);
	}
	}
}

function arrowTower(x, y){
	this.atk = 15;
	this.range = 3;
	this.cost = 20;
	this.x = x;
	this.y = y;
	this.type = "arrow";
	this.target = enemyArr[0];
	this.lastFired = 0;
	this.cd = 1000;
	this.firing = false;
}

function arrowProjectile(x, y, atk, type, target){
	this.x = x;
	this.y = y;
	this.target = target;
	this.atk = atk;
	this.type = type;
	this.speed = 500;
}

function createArrowTower(){
	var tower = new arrowTower(mapArr[M_X], mapArr[M_Y]);
		CANVAS_CLICKED = true;
		document.getElementById("tdCanvas").onclick = function(event){
			M_X = Math.floor(event.offsetX / 60);
			M_Y = Math.floor(event.offsetY / 60);
				if (CANVAS_CLICKED && gold >= tower.cost && mapArr[M_X][M_Y].canBuild == true){
						tower.x = M_X * tileSize;
						tower.y = M_Y * tileSize;
						towerArr.push(tower);
						gold = gold - tower.cost;
            document.getElementById("gold").innerHTML = gold + "G";
						CANVAS_CLICKED = false;
						mapArr[M_X][M_Y].canBuild = false;
					} else {
						CANVAS_CLICKED = false;
					}
	}
}

function magicTower(x, y){
	this.atk = 20;
	this.range = 5;
	this.cost = 25;
	this.x = x;
	this.y = y;
	this.type = "magic";
	this.target = enemyArr[0];
	this.lastFired = 0;
	this.cd = 2500;
	this.firing = false;
}

function magicProjectile(x, y, atk, type, target){
	this.x = x;
	this.y = y;
	this.target = target;
	this.atk = atk;
	this.type = type;
	this.speed = 1000;
}

function createMagicTower(){
	var tower = new magicTower(mapArr[M_X], mapArr[M_Y]);
		CANVAS_CLICKED = true;
		document.getElementById("tdCanvas").onclick = function(event){
			M_X = Math.floor(event.offsetX / 60);
			M_Y = Math.floor(event.offsetY / 60);
				if (CANVAS_CLICKED && gold >= tower.cost && mapArr[M_X][M_Y].canBuild == true){
						tower.x = M_X * tileSize;
						tower.y = M_Y * tileSize;
						towerArr.push(tower);
						gold = gold - tower.cost;
            document.getElementById("gold").innerHTML = gold + "G";
						CANVAS_CLICKED = false;
						mapArr[M_X][M_Y].canBuild = false;
					} else {
						CANVAS_CLICKED = false;
					}
	}
}

function iceTower(x, y){
	this.atk = 5;
	this.range = 2;
	this.cost = 30;
	this.x = x;
	this.y = y;
	this.type = "ice";
	this.target = enemyArr[0];
	this.lastFired = 0;
	this.cd = 500;
	this.firing = false;
}

function iceProjectile(x, y, atk, type, target){
	this.x = x;
	this.y = y;
	this.target = target;
	this.atk = atk;
	this.type = type;
	this.speed = 1000;
}

function createIceTower(){
	var tower = new iceTower(mapArr[M_X], mapArr[M_Y]);
		CANVAS_CLICKED = true;
		document.getElementById("tdCanvas").onclick = function(event){
			M_X = Math.floor(event.offsetX / 60);
			M_Y = Math.floor(event.offsetY / 60);
				if (CANVAS_CLICKED && gold >= tower.cost && mapArr[M_X][M_Y].canBuild == true){
						tower.x = M_X * tileSize;
						tower.y = M_Y * tileSize;
						towerArr.push(tower);
						gold = gold - tower.cost;
            document.getElementById("gold").innerHTML = gold + "G";
						CANVAS_CLICKED = false;
						mapArr[M_X][M_Y].canBuild = false;
					} else {
						CANVAS_CLICKED = false;
					}
	}
}

function fireTower(x, y){
	this.atk = 10;
	this.range = 3;
	this.cost = 20;
	this.x = x;
	this.y = y;
	this.type = "fire";
	this.target = enemyArr[0];
	this.lastFired = 0;
	this.cd = 1000;
	this.firing = false;
}

function fireProjectile(x, y, atk, type, target){
	this.x = x;
	this.y = y;
	this.target = target;
	this.atk = atk;
	this.type = type;
	this.speed = 1000;
}

function createFireTower(){
	var tower = new fireTower(mapArr[M_X], mapArr[M_Y]);
		CANVAS_CLICKED = true;
		document.getElementById("tdCanvas").onclick = function(event){
			M_X = Math.floor(event.offsetX / 60);
			M_Y = Math.floor(event.offsetY / 60);
				if (CANVAS_CLICKED && gold >= tower.cost && mapArr[M_X][M_Y].canBuild == true){
						tower.x = M_X * tileSize;
						tower.y = M_Y * tileSize;
						towerArr.push(tower);
						gold = gold - tower.cost;
            document.getElementById("gold").innerHTML = gold + "G";
						CANVAS_CLICKED = false;
						mapArr[M_X][M_Y].canBuild = false;
					} else {
						CANVAS_CLICKED = false;
					}
	}
}

function Status(name, duration){
	this.name = name;
	this.duration = duration;
}

function calcDistance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function toNearest(num, nearest) {
	let decimal = num / nearest;
	return Math.round(decimal) * nearest;
}

function debug() {
	DEBUG_MODE = !DEBUG_MODE;
	document.getElementById("debug").style = (DEBUG_MODE ? "display: inline-block;" : "display: none;");
	return "Debug Mode: " + (DEBUG_MODE ? "Enabled" : "Disabled");
}
