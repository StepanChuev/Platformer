'use strict';

class Unit {
	constructor(
		{	
			x, y, width, height, strokeStyle, fillStyle, currentSpeed, maxSpeed, 
			jumpPower, maxSpeedJump, maxWalkedJumpPath, maxAmountJumps, maxDeltaTime, jumpSlowdown, 
			maxSpeedFall, health, weapon, updateFunctions = {}
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
		this.updateFunctions = updateFunctions;
	}

	update(){
		for (let key in this.updateFunctions){
			this.updateFunctions[key]();
		}
	}
}