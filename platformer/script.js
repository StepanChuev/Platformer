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

const field = new Field(map, 40, 40);
const hero = new Unit({
	x: 1 * field.tileWidth, y: 8 * field.tileHeight, width: field.tileWidth - 10, height: field.tileHeight, 
	strokeStyle: "#000", fillStyle: "#0000cd",
	currentSpeed: {x: 0, y: 0}, maxSpeed: {x: 3, y: 3}, 
	jumpPower: 30, maxSpeedJump: 170, maxWalkedJumpPath: Infinity, maxAmountJumps: 2, 
	maxDeltaTime: 300, jumpSlowdown: 5, maxSpeedFall: 7, health: 100,
	weapon: new Weapon(0.07, 10, field.tileWidth * map[0].length, field.tileHeight * map.length, "#808080", "#000")
});

const heroFunctions = {
	isOnGround: isOnGround(hero, field, map), isCollideFromLeft: isCollideFromLeft(hero, field, map), 
	isCollideFromRight: isCollideFromRight(hero, field, map), 
	run: run(hero, field, map), fall: fall(hero, field, map), 
	jump: jump(hero, field, map), walkedJumpPath: walkedJumpPath(hero, field, map), 
	calculateShiftX: calculateShiftX(hero, field, map)
};

hero.updateFunctions = heroFunctions;

const downKeys = new Set();

let shiftX = 0, shiftY = 0;
let timestamp = 0;

window.addEventListener("keydown", (event) => {
	if (event.key === " " && !downKeys.has(event.keyCode)){
		heroFunctions.jump(event.keyCode, Date.now() - timestamp);
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
	hero.weapon.shot(hero.x, hero.y, event.layerX - shiftX, event.layerY - shiftY);
});

animation({
	render(){
		context.clearRect(0, 0, canvas.width, canvas.height);

		drawField(shiftX, shiftY);
		drawBullets(hero.weapon, shiftX, shiftY);

		context.strokeStyle = hero.strokeStyle;
		context.fillStyle = hero.fillStyle;

		context.beginPath();
		context.rect(hero.x + shiftX, hero.y + shiftY, hero.width, hero.height);
		context.stroke();
		context.fill();
	},

	update(){
		for (const keyCode of downKeys){
			hero.updateFunctions.run(keyCode);
		}

		hero.update();
		hero.weapon.update();

		const newShiftX = heroFunctions.calculateShiftX(canvas.width);

		if (newShiftX !== Infinity){
			shiftX = newShiftX;
		}

		console.log(shiftX);
	}
});