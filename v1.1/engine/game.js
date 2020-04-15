
class Game {
	constructor({
					name,life = 3,
					height = 600, width = 800,
					backgroundColor,
					backgroundImg,
					gameObjects,
					scaleFactor = 1,
	}) {
		this.name = name;
		this.life = life;
		this.score = 0;
		this.level = 1;
		this.height = height;
		this.width = width;
		this.backgroundColor = backgroundColor;
		this.backgroundImg = backgroundImg;
		this.gameObjects = gameObjects;
		this.scaleFactor = scaleFactor;
	}
}


