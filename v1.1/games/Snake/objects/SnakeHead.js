class SnakeHead extends GameObject {

	static turnSound = new Audio("games/Snake/sounds/turn.wav");
	static bumpSound = new Audio("games/Snake/sounds/bump.wav");
	static eatSound = new Audio("games/Snake/sounds/eat.wav");

	constructor(x, y, speed) {
		super({x,y,color: 'blue', spirit: [[1]]});
		this.lastX = x;
		this.lastY = y;
		this.speed = speed || 0.03;

		SnakeHead.turnSound.volume = 0.1;
		SnakeHead.bumpSound.volume = 0.5;
		SnakeHead.eatSound.volume = 0.5;
	}

	update() {
		this.lastX = Math.round(this.x);
		this.lastY = Math.round(this.y);
		super.update();
	}

	onCollision(collisionMap) {
		collisionMap.forEach( (value, id) => {
			const obj = Controller.getEntityByID(id);
			if(obj instanceof Fruit) {
				obj.active = false;
				SnakeHead.eatSound.play();
				Controller.game.onEatFruit();
			} else if(obj instanceof Border || obj instanceof Bomb || obj instanceof SnakeBodyPart) {
				SnakeHead.bumpSound.play();
				Controller.game.onBump();
			}
		})
	}



	handleEvent(event){
		function playTurn() {
			SnakeHead.turnSound.pause();
			SnakeHead.turnSound.currentTime = 0;
			SnakeHead.turnSound.play();
		}
		switch(event.type){
			case 'keydown':
				switch (event.key) {
					case "ArrowLeft":
						if(this.speedX) return;
						playTurn();
						this.speedX = -this.speed;
						this.speedY = 0;
						break;
					case "ArrowRight":
						if(this.speedX) return;
						playTurn();
						this.speedX = this.speed;
						this.speedY = 0;
						break;
					case "ArrowUp":
						if(this.speedY) return;
						playTurn();
						this.speedY = -this.speed;
						this.speedX = 0;
						break;
					case "ArrowDown":
						if(this.speedY) return;
						playTurn();
						this.speedY = this.speed;
						this.speedX = 0;
						break;
				}
				break
			case 'keyup':
				// this.speedY = 0;
				// this.speedX = 0;
				break;
		}
	}
}
