class Snake extends Game {

	constructor(level= 1) {
		const width = 20;
		const height = 20;

		const gameObjects = [];
		const head = new SnakeHead(5,10, 0.02 + 0.01 * level);
		gameObjects.push(head);
		let bodyPart = new SnakeBodyPart(4,10,head);
		gameObjects.push(bodyPart);
		const lastBodyPart = new SnakeBodyPart(3,10,bodyPart);
		gameObjects.push(lastBodyPart);
		gameObjects.push(new Fruit(16,10));
		gameObjects.push(new Border());

		super({
			name: 'Snake',
			gameObjects,
			width, height, level,
			scaleFactor: 30,
			backgroundImg: 'games/Snake/images/checkboard.png',
		});
		this.lastBodyPart = lastBodyPart;
	}

	onEatFruit() {
		const {x:lastX, y:lastY} = this.lastBodyPart;
		const newLast = new SnakeBodyPart(lastX,lastY, this.lastBodyPart);
		Controller.addEntity(newLast);
		this.lastBodyPart = newLast;

		const {x,y} = this.getRandomFreePos();
		Controller.addEntity(new Fruit(x,y));

		if(this.level == 2) {
			const {x,y} = Controller.game.getRandomFreePos();
			Controller.addEntity(new Bomb(x,y));
		}

		Controller.addScore(20);

		if(this.level == 1 && Controller.score > 200) {
			Controller.nextLevel();
		}
	}

	onBump() {
		Controller.removeLife();
	}

	getRandomFreePos() {
		const occupieds = Controller.getOccupieds();
		let x, y;
		do {
			x = Math.round(Math.random() * (this.width-1));
			y = Math.round(Math.random() * (this.height-1));

		} while (occupieds.get([x,y,0]));
		return {x,y};
	}

}
