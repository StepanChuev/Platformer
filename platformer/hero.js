'use strict';

const isHeroOnGround = () => {
	const a = (hero.y + (hero.height - field.tileHeight));

	if (
		(map[Math.floor(a / field.tileHeight) + 1][Math.floor(hero.x / field.tileWidth)] === "#" || 
		map[Math.floor(a / field.tileHeight) + 1][Math.floor((hero.x + hero.width) / field.tileWidth)] === "#") &&
		Math.floor(a / field.tileHeight) === a / field.tileHeight
		)
	{
		return true; // map[Math.floor(hero.y / field.tileHeight) + 1][Math.floor(hero.x / field.tileWidth)] === "#"
	}

	return false;
};

const isHeroCollideFromLeft = () => {
	return map[Math.floor((hero.y + hero.height - 1) / field.tileHeight)][Math.floor((hero.x - 1) / field.tileWidth)] === "#";
};

const isHeroCollideFromRight = () => {
	return map[Math.floor((hero.y + hero.height - 1) / field.tileHeight)][Math.floor((hero.x + hero.width + 1) / field.tileWidth)] === "#";
};

const heroRun = (keyCode) => {
	if (keyCode === 37 && !isHeroCollideFromLeft()){
		hero.currentSpeed.x = -hero.maxSpeed.x;
		hero.x += hero.currentSpeed.x;
	}

	if (keyCode === 39 && !isHeroCollideFromRight()){
		hero.currentSpeed.x = hero.maxSpeed.x;
		hero.x += hero.currentSpeed.x;
	}

	else {
		hero.currentSpeed.x = 0;
	}
};

const heroFall = () => {
	if (!isHeroOnGround()){
		hero.currentSpeed.y = (hero.currentSpeed.y >= hero.maxSpeedFall) ? hero.maxSpeedFall : hero.currentSpeed.y + hero.jumpSlowdown;
		hero.y += hero.currentSpeed.y;

		const a = hero.y;
		hero.y = Math.floor((hero.y + (hero.height - field.tileHeight)) / field.tileHeight) * field.tileHeight - (hero.height - field.tileHeight);

		if (isHeroOnGround() && hero.currentSpeed.y > 0){
			hero.currentSpeed.y = 0;
			hero.walkedJumpPath = 0;
			hero.amountJumps = 0;
		}

		else {
			hero.y = a;
		}
	}

	else {
		hero.currentSpeed.y = 0;
		hero.walkedJumpPath = 0;
		hero.amountJumps = 0;
	}
};

const heroJump = (keyCode, deltaTime) =>{
	if (
		keyCode === 32 && (isHeroOnGround() || 
		(hero.amountJumps < hero.maxAmountJumps && hero.walkedJumpPath < hero.maxWalkedJumpPath && (hero.currentSpeed.y < 0 || deltaTime < hero.maxDeltaTime)))
		)
	{
		hero.currentSpeed.y = -hero.jumpPower;
		hero.y += hero.currentSpeed.y;
		hero.amountJumps++;
	}
};

const heroWalkedJumpPath = () => {
	if (hero.currentSpeed.y > 0){
		hero.walkedJumpPath = 0;
	}

	else if (hero.currentSpeed.y < 0){
		hero.walkedJumpPath += Math.abs(hero.currentSpeed.y);
	}
};

const heroCalculateShiftX = (displayWidth = 0) => {
	const newShiftX = cameraShiftX(hero.x, -200, displayWidth, field.map[0].length * field.tileHeight);

	if (newShiftX < 0 && displayWidth + Math.abs(newShiftX) < field.map[0].length * field.tileWidth){
		return newShiftX;
	}

	else if (displayWidth + Math.abs(newShiftX) < field.map[0].length * field.tileWidth){
		return 0;
	}

	return Infinity;
};