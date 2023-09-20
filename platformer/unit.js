'use strict';

class Unit {
	constructor(x, y, width, height, currentSpeed, maxSpeed, jumpPower, jumpSlowdown, maxSpeedFall, updateFunctions = {}){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.currentSpeed = currentSpeed;
		this.maxSpeed = maxSpeed;
		this.jumpPower = jumpPower;
		this.jumpSlowdown = jumpSlowdown;
		this.maxSpeedFall = maxSpeedFall;
		this.updateFunctions = updateFunctions;
	}

	update(){
		for (let key in this.updateFunctions){
			this.updateFunctions[key]();
		}
	}
}