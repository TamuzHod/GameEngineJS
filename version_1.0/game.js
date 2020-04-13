let board;

function makeGame(){
	let gameClock = 1;
	let dimentions = [150,100];
	let gameBoard;
	let refrashRate = 25;
	let gameOver = false;
	let score = 0


	let gameObjects = [];
	for(let i=0; i<5; i++){
		let sprit = [[-1,1,-1], [1,1,1],[-1,1,-1],[-1,1,-1], [1,1,1],[-1,1,-1]];
		let x = randInt(0,dimentions[0]);
		let y = randInt(0,dimentions[1]);
		let z = randInt(0,3);
		let speedX = Math.random() * 5;
		let speedY = Math.random() * 5;
		let alien = new GameObject(x,y,1,speedX,speedY,'green', sprit);
		let alien2 = new Alien(x,y,0, 'red');
		gameObjects.push(alien);
		gameObjects.push(alien2);
	}
	let player = new Player(20,20,3, 'blue');
	gameObjects.push(player);
	board = new  Board(10, dimentions[0], dimentions[1], gameObjects,backImg='img.jpg', backgroundColor=null);
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
