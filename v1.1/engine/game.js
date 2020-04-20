
class Game {
	constructor({
					name,
					life = 3,
					level = 1,
					height = 600, width = 800,
					backgroundColor,
					backgroundImg,
					gameObjects,
					scaleFactor = 1,
	}) {
		this.name = name;
		this.level = level;
		this.height = height;
		this.width = width;
		this.backgroundColor = backgroundColor;
		this.backgroundImg = backgroundImg;
		this.gameObjects = gameObjects;
		this.scaleFactor = scaleFactor;
	}

	handleEvent(){
		switch(event.type){
			case 'keydown':
				switch (event.key) {
					case "p":
						Controller.toggleGame();
						break;
				}
				break;
		}
	}
}


