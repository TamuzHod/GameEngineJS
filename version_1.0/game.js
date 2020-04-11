let board;

function makeGame(){
	let gameClock = 1;
	let dimentions = [600,600];
	let gameBoard;
	let refrashRate = 25;
	let gameOver = false;
	let score = 0
			

	let gameObjects = [];
	let player = new Player(20,20,3, 255);
	gameObjects.push(player);
	board = new  Board(dimentions[0], dimentions[1], gameObjects, 0, canvasID = 'gc');
}

function pauseGame(){
	board.pauseGame();
}

function startGame(){
	board.startGame();
}

function randInt(min, max){
	return Math.floor((Math.random() * max) + min);
}