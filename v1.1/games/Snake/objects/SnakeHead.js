class SnakeHead extends GameObject {

	static turnSound = new Audio("games/Snake/sounds/turn.mp3");
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
			const obj = Controller.board.getEntityByID(id);
			if(obj instanceof Fruit) {
				obj.active = false;

				const {x:lastX, y:lastY} = Controller.game.lastBodyPart;
				const newLast = new SnakeBodyPart(lastX,lastY, Controller.game.lastBodyPart);
				Controller.board.addEntity(newLast);
				Controller.game.lastBodyPart = newLast;

				const {x,y} = Controller.game.getRandomFreePos();
				Controller.board.addEntity(new Fruit(x,y));
				Controller.updateScore(Controller.game.score + 20);
			} else if(obj instanceof Border || obj instanceof SnakeBodyPart) {
				Controller.gameOver();
			}
		})
	}

	handleEvent(event){
		SnakeHead.turnSound.pause();
		SnakeHead.turnSound.currentTime = 0;
		SnakeHead.turnSound.play();
		switch(event.type){
			case 'keydown':
				switch (event.key) {
					case "ArrowLeft":
						if(this.speedX) return;
						this.speedX = -this.speed;
						this.speedY = 0;
						break;
					case "ArrowRight":
						if(this.speedX) return;
						this.speedX = this.speed;
						this.speedY = 0;
						break;
					case "ArrowUp":
						if(this.speedY) return;
						this.speedY = -this.speed;
						this.speedX = 0;
						break;
					case "ArrowDown":
						if(this.speedY) return;
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
