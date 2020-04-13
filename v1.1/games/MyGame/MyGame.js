class MyGame extends Game {
	constructor() {
		const canvas = {h : 280, w: 400};
		const gameObjects = [];
		gameObjects.push( new Player({x : 20,  y : 20, z: 3, color: 'blue'}));
		gameObjects.push( new Player({x : 50,  y : 20, z: 3, color: 'blue'}));
		gameObjects.push( new Player({x : 20,  y : 80, z: 3, color: 'blue'}));
		gameObjects.push( new Player({x : 20,  y : 220, z: 3, color: 'blue'}));

		for(let i=0; i<5; i++){
			let spirit = [[-1,1,-1], [1,1,1],[-1,1,-1],[-1,1,-1], [1,1,1],[-1,1,-1]];
			let x = randInt(0, canvas.w);
			let y = randInt(0, canvas.h);
			let speedX = Math.random() * 5;
			let speedY = Math.random() * 5;
			let alien = new Alien({x, y, z: 1,speedX,speedY,color: 'green', spirit, scale: 2});
			let alien2 = new Alien({x, y, z: 0, color: 'red', spirit, scale: 2});
			gameObjects.push(alien);
			gameObjects.push(alien2);
		}
		super({name: `My Game`, life: 3,canvasH : canvas.h, canvasW : canvas.w, gameObjects, backgroundImg: 'games/MyGame/images/img.jpg'});


		function randInt(min, max){
			return Math.floor((Math.random() * max) + min);
		}
	}

	update() {

	}
}
