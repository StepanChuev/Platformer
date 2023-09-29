'use strict';

class Bullet {
	constructor(x, y, velocity, damage, direction){
		this.x = x;
		this.y = y;
		this.velocity = velocity;
		this.damage = damage;
		this.direction = direction;

		let diffX = this.direction.x - this.x;
		let diffY = this.direction.y - this.y;

		this.vx = 100 / (Math.abs(diffX) + Math.abs(diffY)) * diffX * this.velocity;
		this.vy = 100 / (Math.abs(diffX) + Math.abs(diffY)) * diffY * this.velocity;
	}

	update(){
		this.x += this.vx;
		this.y += this.vy;
	}

	isHitEnemy(enemy){
		if (
			enemy.x + enemy.width >= this.x && enemy.x <= this.x &&
			enemy.y + enemy.height >= this.y && enemy.y <= this.y
			)
		{
			return true;
		}

		return false;
	}

	hitEnemy(enemy){
		return enemy.health -= this.damage;
	}
}