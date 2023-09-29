'use strict';

const animation = ({render = () => {}, update = () => {}}) => {

	const tick = (timestamp) => {
		render(timestamp);
		update(timestamp);
		requestAnimationFrame(tick);
	};
	
	requestAnimationFrame(tick);
};

const distance = (x1, y1, x2, y2) => {
	return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

const drawField = (unit, field, map, shiftX = 0, shiftY = 0) => {
	context.strokeStyle = "#000";
	context.fillStyle = "#ff8c00";

	for (let i = 0; i < canvas.height / field.tileHeight && i < field.map.length; i++){
		for (let j = Math.ceil((unit.x - canvas.width) / field.tileWidth); j < (canvas.width + unit.x) / field.tileWidth && j < field.map[0].length; j++){
			if (field.map[i][j] === "#"){
				context.beginPath();
				context.rect(j * field.tileWidth + shiftX, i * field.tileHeight + shiftY, field.tileWidth, field.tileHeight);
				context.stroke();
				context.fill();
			}
		}
	}
};

const drawBullets = (weapon, shiftX = 0, shiftY = 0) => {
	context.fillStyle = weapon.colorBullets;

	for (let i = 0; i < weapon.bullets.length; i++){
		context.beginPath();
		context.arc(weapon.bullets[i].x + shiftX, weapon.bullets[i].y + shiftY, 5, 0, Math.PI * 2);
		context.fill();
	}
};

const drawUnit = (unit, field, map, shiftX = 0, shiftY = 0) => {
	context.fillStyle = unit.fillStyle;
	context.strokeStyle = unit.strokeStyle;

	context.beginPath();
	context.rect(unit.x + shiftX, unit.y + shiftY, unit.width, unit.height);
	context.stroke();
	context.fill();
};