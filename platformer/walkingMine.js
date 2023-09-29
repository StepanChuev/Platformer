'use strict';

const defineDirection = (unit, otherParams) => () => {
	return ((unit.x <= otherParams.leftX && otherParams.direction === "left") ? "right" : (unit.x >= otherParams.rightX && otherParams.direction === "right") ? "left": otherParams.direction);
};

const walke = (unit, otherParams) => () => {
	otherParams.direction = defineDirection(unit, otherParams)();
	unit.updateFunctions.run((otherParams.direction === "left") ? 37 : 39);
};

const isCollideWithEnemies = (unit, otherParams) => () => {
	for (let i = 0; i < unit.enemies.length; i++){
		if (unit.updateFunctions.isCollideWithEnemy(unit.enemies[i])){
			return true;
		}
	}

	return false;
};

const collision = (unit, otherParams) => () => {
	if (isCollideWithEnemies(unit, otherParams)()){
		for (let i = 0; i < unit.enemies.length; i++){
			if (distance(unit.x, unit.y, unit.enemies[i].x, unit.enemies[i].y) < otherParams.damageRadius){
				unit.enemies[i].health -= otherParams.damage;
				unit.health = -1;
			}
		}

		return true;
	}

	return false;
};


const getWmUpdateFunctions = (unit, otherParams) => {
	return {
		defineDirection: defineDirection(unit, otherParams), walke: walke(unit, otherParams),
		isCollideWithEnemies: isCollideWithEnemies(unit, otherParams), collision: collision(unit, otherParams) 
	};
};