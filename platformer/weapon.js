'use strict';

class Weapon {
	constructor(velocity, damage, maxX, maxY, colorWeapon, colorBullets){
		this.velocity = velocity;
		this.damege = damage;
		this.bullets = [];
		this.maxX = maxX;
		this.maxY = maxY;
		this.colorWeapon = colorWeapon;
		this.colorBullets = colorBullets;
	}

	update(){
		for (let i = 0; i < this.bullets.length; i++){
			if (this.bullets[i].x < 0 || this.bullets[i].x > this.maxX || this.bullets[i].y < 0 || this.bullets[i].y > this.maxY){
				this.bullets.splice(i, 1);
			}

			else {
				this.bullets[i].update();
			}
		}
	}

	shot(startX, startY, endX, endY){
		this.bullets.push(new Bullet(startX, startY, this.velocity, this.damage, {x: endX, y: endY}));
	}
}