class Controller {
	static game;
	static board;

	static init() {
		let game = new Snake();
		Controller.game = game;
		Controller.board = new Board(game.scaleFactor, game.width, game.height, game.gameObjects, game.backgroundImg, game.backgroundColor);
		document.getElementById('gameName').innerText = Controller.game.name;
		Controller.updateState();
		Controller.startGame();
	}

	static pauseGame(){
		Controller.board && Controller.board.pauseGame();
	}

	static startGame(){
		Controller.board && Controller.board.startGame();
	}

	static resumeGame(){
		Controller.board && Controller.board.startGame();
	}

	static gameOver(){
		Controller.board && Controller.board.pauseGame();
		Controller.updateLife(Controller.game.life -1);
	}

	static updateLife(value) {
		Controller.game.life = value;
		document.getElementById('lives').innerText = `Lives: ${Controller.game.life}`;
	}

	static updateScore(value) {
		Controller.game.score = value;
		document.getElementById('score').innerText = `Score: ${Controller.game.score}`;
	}

	static updateLevel(value) {
		Controller.game.level = value;
		document.getElementById('level').innerText = `Level: ${Controller.game.level}`;
	}

	static updateStatistics(message) {
		document.getElementById('Misc').innerText = message;
	}

	static 	updateState() {
		Controller.updateLevel(Controller.game.level);
		Controller.updateLife(Controller.game.life);
		Controller.updateScore(Controller.game.score);
	}

	static getOccupieds() {
		return Controller.board && Controller.board.getPos() || new Map();
	}

}

