'use strict';

const isOnGround = (unit, field, map) => () => {
	const a = (unit.y + (unit.height - field.tileHeight));

	if (
		(map[Math.floor(a / field.tileHeight) + 1][Math.floor(unit.x / field.tileWidth)] === "#" || 
		map[Math.floor(a / field.tileHeight) + 1][Math.floor((unit.x + unit.width) / field.tileWidth)] === "#") &&
		Math.floor(a / field.tileHeight) === a / field.tileHeight
		)
	{
		return true; // map[Math.floor(unit.y / field.tileHeight) + 1][Math.floor(unit.x / field.tileWidth)] === "#"
	}

	return false;
};

const isCollideFromLeft = (unit, field, map) => () => {
	return map[Math.floor((unit.y + unit.height - 1) / field.tileHeight)][Math.floor((unit.x - 1) / field.tileWidth)] === "#";
};

const isCollideFromRight = (unit, field, map) => () => {
	return map[Math.floor((unit.y + unit.height - 1) / field.tileHeight)][Math.floor((unit.x + unit.width + 1) / field.tileWidth)] === "#";
};

const isCollideWithEnemy = (unit, field, map) => (enemy) => {
	if (enemy === undefined){
		return false;
	}

	if (
		unit.x + unit.width >= enemy.x && unit.x <= enemy.x + enemy.width &&
		unit.y + unit.height >= enemy.y && unit.y <= enemy.y + enemy.height
		)
	{
		return true;
	}

	return false;
};

const run = (unit, field, map) => (keyCode) => {
	if (keyCode === 37 && !isCollideFromLeft(unit, field, map)()){
		unit.currentSpeed.x = -unit.maxSpeed.x;
		unit.x += unit.currentSpeed.x;
	}

	if (keyCode === 39 && !isCollideFromRight(unit, field, map)()){
		unit.currentSpeed.x = unit.maxSpeed.x;
		unit.x += unit.currentSpeed.x;
	}

	else {
		unit.currentSpeed.x = 0;
	}
};

const fall = (unit, field, map) => () => {
	if (!isOnGround(unit, field, map)()){
		unit.currentSpeed.y = (unit.currentSpeed.y >= unit.maxSpeedFall) ? unit.maxSpeedFall : unit.currentSpeed.y + unit.jumpSlowdown;
		unit.y += unit.currentSpeed.y;

		const a = unit.y;
		unit.y = Math.floor((unit.y + (unit.height - field.tileHeight)) / field.tileHeight) * field.tileHeight - (unit.height - field.tileHeight);

		if (isOnGround(unit, field, map)() && unit.currentSpeed.y > 0){
			unit.currentSpeed.y = 0;
			unit.walkedJumpPath = 0;
			unit.amountJumps = 0;
		}

		else {
			unit.y = a;
		}
	}

	else {
		unit.currentSpeed.y = 0;
		unit.walkedJumpPath = 0;
		unit.amountJumps = 0;
	}
};

const jump = (unit, field, map) => (keyCode, deltaTime) => {
	if (
		keyCode === 32 && (isOnGround(unit, field, map)() || 
		(unit.amountJumps < unit.maxAmountJumps && unit.walkedJumpPath < unit.maxWalkedJumpPath && (unit.currentSpeed.y < 0 || deltaTime < unit.maxDeltaTime)))
		)
	{
		unit.currentSpeed.y = -unit.jumpPower;
		unit.y += unit.currentSpeed.y;
		unit.amountJumps++;
	}
};

const walkedJumpPath = (unit, field, map) => () => {
	if (unit.currentSpeed.y > 0){
		unit.walkedJumpPath = 0;
	}

	else if (unit.currentSpeed.y < 0){
		unit.walkedJumpPath += Math.abs(unit.currentSpeed.y);
	}
};

const calculateShiftX = (unit, field, map) => (displayWidth = 0) => {
	const newShiftX = cameraShiftX(unit.x, -200, displayWidth, field.map[0].length * field.tileHeight);

	if (newShiftX < 0 && displayWidth + Math.abs(newShiftX) < field.map[0].length * field.tileWidth){
		return newShiftX;
	}

	else if (displayWidth + Math.abs(newShiftX) < field.map[0].length * field.tileWidth){
		return 0;
	}

	return Infinity;
};


const getUpdateFunctions = (unit, field, map) => {
	return {
		isOnGround: isOnGround(unit, field, map), isCollideFromLeft: isCollideFromLeft(unit, field, map), 
		isCollideFromRight: isCollideFromRight(unit, field, map), isCollideWithEnemy: isCollideWithEnemy(unit, field, map),
		run: run(unit, field, map), fall: fall(unit, field, map), 
		jump: jump(unit, field, map), walkedJumpPath: walkedJumpPath(unit, field, map), 
		calculateShiftX: calculateShiftX(unit, field, map)
	};
};