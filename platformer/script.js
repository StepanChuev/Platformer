'use strict';

const drawField = () => {
	context.strokeStyle = "#000";
	context.fillStyle = "#ff8c00";

	for (let i = 0; i < map.length; i++){
		for (let j = 0; j < map[i].length; j++){
			if (field.map[i][j] === "#"){
				context.beginPath();
				context.rect(j * field.tileWidth, i * field.tileHeight, field.tileWidth, field.tileHeight);
				context.stroke();
				context.fill();
			}
		}
	}
};

const map = [
	"                                                ",
	"                                                ",
	"                                                ",
	"                                                ",
	"                                                ",
	"                                                ",
	"                                                ",
	"                                                ",
	"                                                ",
	" #    ###   #    #### ### #                     ",
	"                                                ",
	"                                                ",
	"                                                ",
	"                                                ",
	"                                                ",
	"                                                ",
	"#############   #### #########              ####",
	"                                                ",
	"                                                ",
	"  #                                             ",
	"                                                ",
	"  #                    #                        ",
	"################################################",
];

const heroFunctions = {isHeroOnGround, isHeroCollideFromLeft, isHeroCollideFromRight, heroRun, heroFall, heroJump};

const canvas = document.querySelector('.canvas');
const context = canvas.getContext("2d");
const field = new Field(map, 40, 40);
const hero = new Unit(1 * field.tileWidth, 8 * field.tileHeight, field.tileWidth - 10, field.tileHeight, {x: 0, y: 0}, {x: 3, y: 3}, 170, 5, 5, heroFunctions);
const downKeys = new Set();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.lineWidth = 3;
context.strokeStyle = "#000";
context.fillStyle = "#ff8c00";

window.addEventListener("keydown", (event) => {
	console.log("DOWN");
	downKeys.add(event.keyCode)
});

window.addEventListener("keyup", (event) => {
	console.log("UP");
	downKeys.delete(event.keyCode);
});

animation({
	render(){
		context.clearRect(0, 0, canvas.width, canvas.height);

		drawField();

		context.strokeStyle = "#000";
		context.fillStyle = "#0000cd";

		context.beginPath();
		context.rect(hero.x, hero.y, hero.width, hero.height);
		context.stroke();
		context.fill();
	},

	update(){
		// if (!isHeroOnGround()){
		// 	console.log("Hero is not on the ground");
		// }

		// if (isHeroCollideFromLeft()){
		// 	console.log("Left Collide");
		// }

		// if (isHeroCollideFromRight()){
		// 	console.log("Right Collide");
		// }

		for (const keyCode of downKeys){
			heroRun(keyCode);
			heroJump(keyCode);
		}

		hero.update();
	}
});