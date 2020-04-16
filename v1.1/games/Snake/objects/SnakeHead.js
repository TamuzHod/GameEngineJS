class SnakeHead extends GameObject {

	constructor(x, y) {
		super({x,y,color: 'blue', spirit: [[1]]});
		this.lastX = x;
		this.lastY = y;
	}

	update() {
		this.lastX = Math.floor(this.x);
		this.lastY = Math.floor(this.y);
		super.update();
	}

	onCollision(collisionMap) {
		collisionMap.forEach( (value, id) => {
			const obj = Controller.board.getEntityByID(id);
			if(obj instanceof Fruit) {
				obj.active = false;
				const {x,y} = Controller.game.getRandomFreePos();
				Controller.board.addEntity(new Fruit(x,y));
				Controller.updateScore(Controller.game.score + 20);
			} else if(obj instanceof Border || obj instanceof SnakeBodyPart) {
				Controller.gameOver();
			}
		})
	}

	handleEvent(event){
		switch(event.type){
			case 'keydown':
				switch (event.key) {
					case "ArrowLeft":
						this.speedX = -0.05;
						this.speedY = 0;
						break;
					case "ArrowRight":
						this.speedX = 0.05;
						this.speedY = 0;
						break;
					case "ArrowUp":
						this.speedY = -0.05;
						this.speedX = 0;
						break;
					case "ArrowDown":
						this.speedY = 0.05;
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
