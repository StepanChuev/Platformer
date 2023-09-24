'use strict';

class Unit {
	constructor({x, y, width, height, currentSpeed, maxSpeed, jumpPower, maxSpeedJump, maxWalkedJumpPath, maxAmountJumps, maxDeltaTime, jumpSlowdown, maxSpeedFall, updateFunctions = {}}){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
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
		this.updateFunctions = updateFunctions;
	}

	update(){
		for (let key in this.updateFunctions){
			this.updateFunctions[key]();
		}
	}
}