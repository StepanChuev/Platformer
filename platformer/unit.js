'use strict';

class Unit {
	constructor(
		{	
			x, y, width, height, strokeStyle, fillStyle, currentSpeed, maxSpeed, 
			jumpPower, maxSpeedJump, maxWalkedJumpPath, maxAmountJumps, maxDeltaTime, jumpSlowdown, 
			maxSpeedFall, health, weapon, enemies, updateFunctions = {}, otherParams = {}
		}
		){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.strokeStyle = strokeStyle;
		this.fillStyle = fillStyle;
		this.currentSpeed = currentSpeed;
		this.maxSpeed = maxSpeed;
		this.jumpPower = jumpPower;
		this.maxSpeedJump = maxSpeedJump;
		this.maxWalkedJumpPath = maxWalkedJumpPath;
		this.amountJumps = 0;
		this.maxAmountJumps = maxAmountJumps;
		this.maxDeltaTime = maxDeltaTime;
		this.jumpSlowdown = jumpSlowdown;
		this.walkedJumpPath = 0;
		this.maxSpeedFall = maxSpeedFall;
		this.health = health;
		this.weapon = weapon;
		this.enemies = enemies;
		this.updateFunctions = updateFunctions;
		this.otherParams = otherParams;
	}

	update(){
		for (let key in this.updateFunctions){
			this.updateFunctions[key]();
		}
	}
}