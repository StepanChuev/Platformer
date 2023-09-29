'use strict';

const map = [
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	" #    ###   #    #### ### #                                                                     ",
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"#############   #### #########              ####                                                ",
	"                                                                                                ",
	"                                                                                                ",
	"  #                                                                                             ",
	"                                                                                                ",
	"  #                    #                                                                        ",
	"################################################################################################",
];


const canvas = document.querySelector('.canvas');
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.lineWidth = 3;
context.strokeStyle = "#000";
context.fillStyle = "#ff8c00";
context.font = "24px Cambria";

const field = new Field(map, 40, 40);

const units = {};

units.hero = new Unit({
	x: 1 * field.tileWidth, y: 8 * field.tileHeight, width: field.tileWidth - 10, height: field.tileHeight, 
	strokeStyle: "#000", fillStyle: "#0000cd",
	currentSpeed: {x: 0, y: 0}, maxSpeed: {x: 3, y: 3}, 
	jumpPower: 30, maxSpeedJump: 170, maxWalkedJumpPath: Infinity, maxAmountJumps: 2, 
	maxDeltaTime: 300, jumpSlowdown: 5, maxSpeedFall: 7, health: 100,
	weapon: new Weapon(0.07, 10, field.tileWidth * map[0].length, field.tileHeight * map.length, [], "#000"),
	enemies: []
});

units.hero.weapon.enemies = units.hero.enemies;

const heroFunctions = getUpdateFunctions(units.hero, field, map);

units.hero.updateFunctions = heroFunctions;

units.walkingMine1 = new Unit({
	x: 1 * field.tileWidth, y: 15 * field.tileHeight + 15, width: field.tileWidth, height: field.tileHeight - 15, 
	strokeStyle: "#000", fillStyle: "#ff0",
	currentSpeed: {x: 0, y: 0}, maxSpeed: {x: 3, y: 3}, 
	jumpPower: 30, maxSpeedJump: 170, maxWalkedJumpPath: Infinity, maxAmountJumps: 2, 
	maxDeltaTime: 300, jumpSlowdown: 5, maxSpeedFall: 7, health: 25,
	weapon: new Weapon(0, 0, 0, 0, "#000"),
	enemies: [units.hero, units.hero.weapon.bullets],
	otherParams: {
		damage: 10, damageRadius: 200, 
		leftX: 0, rightX: 10 * field.tileWidth,
		direction: "left"
	}
});

units.walkingMine1.updateFunctions = {
	...getUpdateFunctions(units.walkingMine1, field, map), 
	...getWmUpdateFunctions(units.walkingMine1, units.walkingMine1.otherParams)
};

units.walkingMine2 = new Unit({
	x: 3 * field.tileWidth, y: 21 * field.tileHeight + 15, width: field.tileWidth, height: field.tileHeight - 15, 
	strokeStyle: "#000", fillStyle: "#ff0",
	currentSpeed: {x: 0, y: 0}, maxSpeed: {x: 3, y: 3}, 
	jumpPower: 30, maxSpeedJump: 170, maxWalkedJumpPath: Infinity, maxAmountJumps: 2, 
	maxDeltaTime: 300, jumpSlowdown: 5, maxSpeedFall: 7, health: 25,
	weapon: new Weapon(0, 0, 0, 0, "#000"),
	enemies: [units.hero, units.hero.weapon.bullets],
	otherParams: {
		damage: 100, damageRadius: 200, 
		leftX: 3 * field.tileWidth, rightX: 10 * field.tileWidth,
		direction: "left"
	}
});

units.walkingMine2.updateFunctions = {
	...getUpdateFunctions(units.walkingMine2, field, map), 
	...getWmUpdateFunctions(units.walkingMine2, units.walkingMine2.otherParams)
};

units.hero.enemies.push(units.walkingMine1, units.walkingMine2);

const downKeys = new Set();

let isGameOver = false;
let shiftX = 0, shiftY = 0;
let timestamp = 0;

window.addEventListener("keydown", (event) => {
	if (event.key === " " && !downKeys.has(event.keyCode)){
		units.hero.updateFunctions.jump(event.keyCode, Date.now() - timestamp);
		timestamp = Date.now();
	}

	downKeys.add(event.keyCode);
	console.log("DOWN");
});

window.addEventListener("keyup", (event) => {
	downKeys.delete(event.keyCode);
	console.log("UP");
});

canvas.addEventListener("click", (event) => {
	units.hero.weapon.shot(units.hero.x, units.hero.y, event.layerX - shiftX, event.layerY - shiftY);
});

animation({
	render(){
		if (isGameOver){
			context.fillStyle = "rgba(0, 0, 0, 0.1)";

			context.beginPath();
			context.rect(0, 0, canvas.width, canvas.height);
			context.fill();

			console.log("Game Over");

			return;
		}

		context.clearRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = "#000";

		context.fillText(`health: ${units.hero.health}`, canvas.width - 150, 40);

		drawField(units.hero, field, map, shiftX, shiftY);
		drawBullets(units.hero.weapon, shiftX, shiftY);

		context.strokeStyle = units.hero.strokeStyle;
		context.fillStyle = units.hero.fillStyle;

		for (let unitName in units){
			drawUnit(units[unitName], field, map, shiftX, shiftY);
			drawUnit(units[unitName], field, map, shiftX, shiftY);
		}
	},

	update(){
		if (isGameOver){
			return;
		}

		const newShiftX = units.hero.updateFunctions.calculateShiftX(canvas.width);

		if (newShiftX !== Infinity){
			shiftX = newShiftX;
		}

		for (const keyCode of downKeys){
			units.hero.updateFunctions.run(keyCode);
		}

		for (let unitName in units){
			units[unitName].update();

			units[unitName].weapon.update(units[unitName].enemies);

			if (units[unitName].health <= 0){
				isGameOver = unitName === "hero";
				delete units[unitName];
			}
		}

		console.log(shiftX);
	}
});