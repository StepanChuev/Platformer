'use strict';

const animation = ({render = () => {}, update = () => {}}) => {

	const tick = (timestamp) => {
		render(timestamp);
		update(timestamp);
		requestAnimationFrame(tick);
	};
	
	requestAnimationFrame(tick);
};

const drawField = (shiftX = 0, shiftY = 0) => {
	context.strokeStyle = "#000";
	context.fillStyle = "#ff8c00";

	for (let i = 0; i < canvas.height / field.tileHeight && i < field.map.length; i++){
		for (let j = Math.ceil((hero.x - canvas.width) / field.tileWidth); j < (canvas.width + hero.x) / field.tileWidth && j < field.map[0].length; j++){
			if (field.map[i][j] === "#"){
				context.beginPath();
				context.rect(j * field.tileWidth + shiftX, i * field.tileHeight + shiftY, field.tileWidth, field.tileHeight);
				context.stroke();
				context.fill();
			}
		}
	}
};