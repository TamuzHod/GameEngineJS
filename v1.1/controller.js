class Controller {
	static game;
	static #engine;

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
		Controller.#engine && Controller.#engine.pauseGame();
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
		return Controller.#engine && Controller.#engine.getPos() || new Map();
	}

}

