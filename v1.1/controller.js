class Controller {
	static game;
	static #engine;

	static life = 3;
	static score = 0;
	static level = 1;

	static init(game) {
		Controller.game = game;
		Controller.#engine = new Engine(game.scaleFactor, game.width, game.height, game.gameObjects, game.backgroundImg, game.backgroundColor);
		document.getElementById('toggle-game').innerText = 'Pause';
		document.getElementById('gameName').innerText = Controller.game.name;
		Controller.updateState();
		Controller.#engine.startGame()
		window.addEventListener('keydown', function (e) {
            Controller.eventDelegator(e);
        })
        document.addEventListener('keypress', function (e) {
            Controller.eventDelegator(e);
        })
        window.addEventListener('keyup', function (e) {
            Controller.eventDelegator(e);
        })
	}

	static eventDelegator(event){
		event.preventDefault();
		if(!Controller.#engine.stop){
			Controller.#engine.gameObjects.filter( (entity) => entity.active).forEach(function (entity){
				if(entity.handleEvent){
					entity.handleEvent(event);
				}
			});
		}
		Controller.game.handleEvent(event);
	}

	static initGame() {
		Controller.pauseGame();
		const gameClassName = document.getElementById("game").value;
		const game = eval(`new ${gameClassName}()`);
		Controller.init(game);
	}

	static restartGame() {
		Controller.pauseGame();
		const gameClassName = Controller.game.constructor.name;
		const game = eval(`new ${gameClassName}()`);
		Controller.score = 0;
		Controller.life  = 3;
		Controller.init(game);
	}

	static getEntityByID(id){
		return Controller.#engine && Controller.#engine.getEntityByID(id) || null;
	}

	static addEntity(entity){
		Controller.#engine && Controller.#engine.addEntity(entity);
	}


	static pauseGame(){
		Controller.#engine && Controller.#engine.pauseGame();
	}

	static resumeGame(){
		Controller.#engine && Controller.#engine.startGame();
	}

	static toggleGame() {
		if(!Controller.#engine)
			return;

		Controller.#engine.stop ? Controller.#engine.resumeGame() : Controller.#engine.pauseGame();
		document.getElementById('toggle-game').innerText = Controller.#engine.stop ? 'Resume': 'Pause';

	}

	static gameOver(){
		Controller.pauseGame();
		// TODO: game over logic
	}

	static nextLevel() {
		Controller.pauseGame();
		const gameClassName = Controller.game.constructor.name;
		const game = eval(`new ${gameClassName}(${++Controller.level})`);
		Controller.init(game);
	}

	static removeLife() {
		Controller.life--;
		document.getElementById('lives').innerText = `Lives: ${Controller.life}`;

		if(Controller.life) {
			Controller.initGame();
		}
		else {
			Controller.gameOver();
		}
	}

	static addScore(value) {
		Controller.score += value;
		document.getElementById('score').innerText = `Score: ${Controller.score}`;
	}

	static updateStatistics(message) {
		document.getElementById('Misc').innerText = message;
	}

	static 	updateState() {
		document.getElementById('lives').innerText = `Lives: ${Controller.life}`;
		document.getElementById('level').innerText = `Level: ${Controller.level}`;
		document.getElementById('score').innerText = `Score: ${Controller.score}`;
		// Controller.updateLevel(Controller.level);
		// Controller.updateLife(Controller.life);
		// Controller.addScore(0);
	}

	static getOccupieds() {
		return Controller.#engine && Controller.#engine.getPos() || new Map();
	}

}

