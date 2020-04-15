class SnakeHead extends GameObject {
	constructor(x, y) {
		super({x,y,color: 'blue', spirit: [[1]]});
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
