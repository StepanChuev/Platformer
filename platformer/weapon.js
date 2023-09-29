'use strict';

class Weapon {
	constructor(velocity, damage, maxX, maxY, enemies, colorBullets){
		this.velocity = velocity;
		this.damage = damage;
		this.bullets = [];
		this.maxX = maxX;
		this.maxY = maxY;
		this.enemies = enemies;
		this.colorBullets = colorBullets;
	}

	update(){
		for (let i = 0; i < this.bullets.length; i++){
			if (this.bullets[i].x < 0 || this.bullets[i].x > this.maxX || this.bullets[i].y < 0 || this.bullets[i].y > this.maxY){
				this.bullets.splice(i, 1);
			}

			else {
				this.bullets[i].update();
				this.hitEnemy(i, this.enemies);
			}
		}
	}

	shot(startX, startY, endX, endY){
		this.bullets.push(new Bullet(startX, startY, this.velocity, this.damage, {x: endX, y: endY}));
	}

	hitEnemy(i){
		for (let j = 0; j < this.enemies.length; j++){
			if (this.bullets[i].isHitEnemy(this.enemies[j])){
				this.bullets[i].hitEnemy(this.enemies[j]);
				this.bullets.splice(i, 1);

				if (this.enemies[j].health < 0){
					this.enemies.splice(j, 1);
				}

				break;
			}
		}
	}
}