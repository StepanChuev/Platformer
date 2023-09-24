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

const heroFunctions = {isHeroOnGround, isHeroCollideFromLeft, isHeroCollideFromRight, heroRun, heroFall, heroJump, heroWalkedJumpPath, heroCalculateShiftX};
const canvas = document.querySelector('.canvas');
const context = canvas.getContext("2d");
const field = new Field(map, 40, 40);
const hero = new Unit({
	x: 1 * field.tileWidth, y: 8 * field.tileHeight, width: field.tileWidth - 10, height: field.tileHeight, 
	currentSpeed: {x: 0, y: 0}, maxSpeed: {x: 3, y: 3}, 
	jumpPower: 30, maxSpeedJump: 170, maxWalkedJumpPath: Infinity, maxAmountJumps: 2, 
	maxDeltaTime: 300, jumpSlowdown: 5, maxSpeedFall: 7, updateFunctions: heroFunctions
});
const downKeys = new Set();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.lineWidth = 3;
context.strokeStyle = "#000";
context.fillStyle = "#ff8c00";

let shiftX = 0, shiftY = 0;
let timestamp = 0;

window.addEventListener("keydown", (event) => {
	if (event.key === " " && !downKeys.has(event.keyCode)){
		heroFunctions.heroJump(event.keyCode, Date.now() - timestamp);
		timestamp = Date.now();
	}

	downKeys.add(event.keyCode);
	console.log("DOWN");
});

window.addEventListener("keyup", (event) => {
	downKeys.delete(event.keyCode);
	console.log("UP");
});

animation({
	render(){
		context.clearRect(0, 0, canvas.width, canvas.height);

		drawField(shiftX, shiftY);

		context.strokeStyle = "#000";
		context.fillStyle = "#0000cd";

		context.beginPath();
		context.rect(hero.x + shiftX, hero.y + shiftY, hero.width, hero.height);
		context.stroke();
		context.fill();
	},

	update(){
		for (const keyCode of downKeys){
			heroFunctions.heroRun(keyCode);
		}

		hero.update();

		const newShiftX = heroFunctions.heroCalculateShiftX(canvas.width);

		if (newShiftX !== Infinity){
			shiftX = newShiftX;
		}

		console.log(shiftX);
	}
});