class SnakeHead extends GameObject {

	static turnSound = new Audio("games/Snake/sounds/turn.wav");
	static bumpSound = new Audio("games/Snake/sounds/bump.wav");
	static eatSound = new Audio("games/Snake/sounds/eat.wav");

	constructor(x, y, speed) {
		super({x,y,color: 'blue', spirit: [[1]]});
		this.lastX = x;
		this.lastY = y;
		this.speed = speed || 0.03;

	}

	update() {
		this.lastX = Math.round(this.x);
		this.lastY = Math.round(this.y);
		super.update();
	}

	onCollision(collisionMap) {
		collisionMap.forEach( (value, id) => {
			const obj = Controller.engine.getEntityByID(id);
			if(obj instanceof Fruit) {
				obj.active = false;
				SnakeHead.eatSound.play();
				const {x:lastX, y:lastY} = Controller.game.lastBodyPart;
				const newLast = new SnakeBodyPart(lastX,lastY, Controller.game.lastBodyPart);
				Controller.engine.addEntity(newLast);
				Controller.game.lastBodyPart = newLast;

				const {x,y} = Controller.game.getRandomFreePos();
				Controller.engine.addEntity(new Fruit(x,y));
				Controller.updateScore(Controller.game.score + 20);
			} else if(obj instanceof Border || obj instanceof SnakeBodyPart) {
				SnakeHead.bumpSound.play();
				Controller.gameOver();
			}
		})
	}



	handleEvent(event){
		function playTurn() {
			SnakeHead.turnSound.pause();
			SnakeHead.turnSound.currentTime = 0;
			SnakeHead.turnSound.volume = 0.1;
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
