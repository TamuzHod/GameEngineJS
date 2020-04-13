
class Game {
	constructor({
					name,life = 3,
					canvasH = 600, canvasW = 800,
					backgroundColor,
					backgroundImg,
					gameObjects,
	}) {
		this.name = name;
		this.life = life;
		this.canvasH = canvasH;
		this.canvasW = canvasW;
		this.backgroundColor = backgroundColor;
		this.backgroundImg = backgroundImg;
		this.gameObjects = gameObjects;
	}

	update() {}
}


