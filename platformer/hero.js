'use strict';

const heroRun = (keyCode) => {
	if (keyCode === 37 && !isHeroCollideFromLeft()){
		hero.currentSpeed.x = hero.maxSpeed.x;
		hero.x -= hero.currentSpeed.x;
	}

	if (keyCode === 39 && !isHeroCollideFromRight()){
		hero.currentSpeed.x = hero.maxSpeed.x;
		hero.x += hero.currentSpeed.x;
	}

	else {
		hero.currentSpeed.x = 0;
	}
};

const isHeroOnGround = () => {
	if (
		(map[Math.floor(hero.y / field.tileHeight) + 1][Math.floor(hero.x / field.tileWidth)] === "#" || 
		map[Math.floor(hero.y / field.tileHeight) + 1][Math.ceil(hero.x / field.tileWidth)] === "#") &&
		Math.floor(hero.y / field.tileHeight) === hero.y / field.tileHeight
		)
	{
		return true; // map[Math.floor(hero.y / field.tileHeight) + 1][Math.floor(hero.x / field.tileWidth)] === "#"
	}

	return false;
};

const isHeroCollideFromLeft = () => {
	return map[Math.floor(hero.y / field.tileHeight)][Math.floor((hero.x - 1) / field.tileWidth)] === "#";
};

const isHeroCollideFromRight = () => {
	return map[Math.floor(hero.y / field.tileHeight)][Math.floor((hero.x + hero.width + 1) / field.tileWidth)] === "#";
};

const heroFall = () => {
	if (!isHeroOnGround()){
		hero.currentSpeed.y += hero.jumpSlowdown;
		hero.y += (hero.currentSpeed.y > hero.maxSpeedFall) ? hero.maxSpeedFall : hero.currentSpeed.y;
	}
};

const heroJump = (keyCode) => {
	if (keyCode === 32 && isHeroOnGround()){
		hero.y -= hero.jumpPower;
	}
};