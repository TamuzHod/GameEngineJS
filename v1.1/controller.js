class Controller {
	static game;
	static board;

	static init() {
		let game = new MyGame();
		Controller.game = game;
		Controller.board = new Board(2,game.canvasW, game.canvasH, game.gameObjects, game.backgroundImg, game.backgroundColor);
		document.getElementById('gameName').innerText = Controller.game.name;
	}

	static pauseGame(){
		Controller.board && Controller.board.pauseGame();
	}

	static startGame(){
		Controller.board && Controller.board.startGame();
	}

	static updateLife(value) {
		Controller.game.life = value;
		document.getElementById('lives').innerText = `Lives: ${Controller.game.life}`;
	}

	static updateStatistics(message) {
		document.getElementById('Misc').innerText = message;
	}

}

