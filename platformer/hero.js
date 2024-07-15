'use strict';

function UpdateFunctions(unit, field, map){
	const funcs = {
		isOnGround(){
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
		},

		isCollideFromLeft(){
			return map[Math.floor((unit.y + unit.height - 1) / field.tileHeight)][Math.floor((unit.x - 1) / field.tileWidth)] === "#";
		},

		isCollideFromRight(){
			return map[Math.floor((unit.y + unit.height - 1) / field.tileHeight)][Math.floor((unit.x + unit.width + 1) / field.tileWidth)] === "#";
		},

		isCollideWithEnemy(enemy){
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
		},

		run(keyCode){
			if (keyCode === 37 && !this.isCollideFromLeft()){
				unit.currentSpeed.x = -unit.maxSpeed.x;
				unit.x += unit.currentSpeed.x;
			}

			if (keyCode === 39 && !this.isCollideFromRight()){
				unit.currentSpeed.x = unit.maxSpeed.x;
				unit.x += unit.currentSpeed.x;
			}

			else {
				unit.currentSpeed.x = 0;
			}
		},

		fall(){
			if (!this.isOnGround()){
				unit.currentSpeed.y = (unit.currentSpeed.y >= unit.maxSpeedFall) ? unit.maxSpeedFall : unit.currentSpeed.y + unit.jumpSlowdown;
				unit.y += unit.currentSpeed.y;

				const a = unit.y;
				unit.y = Math.floor((unit.y + (unit.height - field.tileHeight)) / field.tileHeight) * field.tileHeight - (unit.height - field.tileHeight);

				if (this.isOnGround() && unit.currentSpeed.y > 0){
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
		},

		jump(keyCode, deltaTime){
			if (
				keyCode === 32 && (this.isOnGround() || 
				(unit.amountJumps < unit.maxAmountJumps && unit.walkedJumpPath < unit.maxWalkedJumpPath && (unit.currentSpeed.y < 0 || deltaTime < unit.maxDeltaTime)))
				)
			{
				unit.currentSpeed.y = -unit.jumpPower;
				unit.y += unit.currentSpeed.y;
				unit.amountJumps++;
			}
		},

		walkedJumpPath(){
			if (unit.currentSpeed.y > 0){
				unit.walkedJumpPath = 0;
			}

			else if (unit.currentSpeed.y < 0){
				unit.walkedJumpPath += Math.abs(unit.currentSpeed.y);
			}
		},

		calculateShiftX(displayWidth = 0){
			const newShiftX = cameraShiftX(unit.x, -200, displayWidth, field.map[0].length * field.tileHeight);

			if (newShiftX < 0 && displayWidth + Math.abs(newShiftX) < field.map[0].length * field.tileWidth){
				return newShiftX;
			}

			else if (displayWidth + Math.abs(newShiftX) < field.map[0].length * field.tileWidth){
				return 0;
			}

			return Infinity;
		}
	};

	return funcs;
}
