'use strict';

function WMUpdateFunctions(unit, otherParams){
	const funcs = {
		defineDirection(){
			return ((unit.x <= otherParams.leftX && otherParams.direction === "left") ? "right" : (unit.x >= otherParams.rightX && otherParams.direction === "right") ? "left": otherParams.direction);
		},

		walke(){
			otherParams.direction = this.defineDirection();
			unit.updateFunctions.run((otherParams.direction === "left") ? 37 : 39);
		},

		isCollideWithEnemies(){
			for (let i = 0; i < unit.enemies.length; i++){
				if (unit.updateFunctions.isCollideWithEnemy(unit.enemies[i])){
					return true;
				}
			}

			return false;
		},

		collision(){
			if (this.isCollideWithEnemies()){
				for (let i = 0; i < unit.enemies.length; i++){
					if (distance(unit.x, unit.y, unit.enemies[i].x, unit.enemies[i].y) < otherParams.damageRadius){
						unit.enemies[i].health -= otherParams.damage;
						unit.health = -1;
					}
				}

				return true;
			}

			return false;
		}
	};

	return funcs;
}
