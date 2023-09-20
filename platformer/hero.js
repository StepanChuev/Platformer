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
		hero.currentSpeed.y += hero.jumpSlowdown;
		hero.y += (Math.abs(hero.currentSpeed.y) > hero.maxSpeedFall) ? hero.maxSpeedFall : Math.abs(hero.currentSpeed.y);
	}
};

const heroJump = (keyCode) => {
	if (keyCode === 32 && isHeroOnGround()){
		hero.currentSpeed.y = -hero.jumpPower;
		hero.y -= hero.jumpPower;
	}
};