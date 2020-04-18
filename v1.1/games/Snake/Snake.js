class Snake extends Game {

	constructor() {
		const width = 20;
		const height = 20;

		const gameObjects = [];
		const head = new SnakeHead(5,10);
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
			width, height,
			scaleFactor: 30,
			backgroundImg: 'games/Snake/images/checkengine.png',
		});
		this.lastBodyPart = lastBodyPart;
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
