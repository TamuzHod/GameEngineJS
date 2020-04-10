
function run(){
	let gameClock = 1;
	let dimentions = [200,200];
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
		let speedX = Math.random() * 10;
		let speedY = Math.random() * 1;

		let alien = new GameObject(x,y,1,speedX,speedY,'black', sprit);
		let alien2 = new Alien(x,y,0, 'red');
		gameObjects.push(alien);
		gameObjects.push(alien2);

	}
	let player = new Player(20,20,3, 'blue');
	gameObjects.push(player);
	let board = new  Board(dimentions[0], dimentions[1], gameObjects, 'white', canvasID = 'gc');
	board.startGame();

}

function randInt(min, max){
	return Math.floor((Math.random() * max) + min);
}