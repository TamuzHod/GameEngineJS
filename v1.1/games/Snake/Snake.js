class Snake extends Game {

	constructor() {
		const width = 20;
		const height = 20;

		const gameObjects = [];

		gameObjects.push(new SnakeHead(5,10));
		gameObjects.push(new SnakeBodyPart(4,10));
		gameObjects.push(new SnakeBodyPart(3,10));
		gameObjects.push(new Fruit(16,10));
		gameObjects.push(new Border());
		// for(let i = 0; i< 10; i++) {
		// 	const {x,y} = getRandomFreePos(width, height);
		// 	gameObjects.push(new Fruit(x,y));
		// }

		super({name: 'Snake', gameObjects, width, height, scaleFactor: 30});
	}

	getRandomFreePos() {
		const occupieds = Controller.getOccupieds();
		let x, y;
		do {
			x = Math.floor(Math.random() * this.width);
			y = Math.floor(Math.random() * this.height);

		} while (occupieds.get([x,y,0]));
		return {x,y};
	}

}
