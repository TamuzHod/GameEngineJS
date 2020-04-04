let bullets = [];
async function playGame(){
	if(singlton)
		return;
	singlton = true;
	let gameClock = 1;
	let dimentions = [40,40];
	let gameBoard;
	let refrashRate = 25;
	let gameOver = false;
	let score = 0
	let player = {
		health : 3,
		y : dimentions[0] - 1,
		x : parseInt(dimentions[1] / 2),
		color : 'turquoise',
	}

	window.addEventListener('keydown', function (e) {
    	keyHandler(gameBoard, player, e);
    })
    //window.addEventListener('keyup', function (e) {
    //	print(e.keyCode + 'up');
    //})

	
	let aliens = []
	for(let i=0; i < 5; i++){
		let alien = { 
			x : random(dimentions[0]),
			y : 0,
			speed : random(5) + 1,
			color : random(Math.pow(255, 3)-1),
			active : true
		};
		aliens[i] = alien;
	}
		
	while(!gameOver){
		gameBoard = zeros(dimentions[0],dimentions[1]);
		if(gameClock % calcSpeed(4, refrashRate) == 0){
			let alien = { 
				x : random(dimentions[0]),
				y : 0,
				speed : random(5) + 1,
				color : random(Math.pow(255, 3)-1),
				active : true
			};
			aliens = pruneDead(aliens);		
			aliens[aliens.length] = alien;
		}

		drawPlayer(gameBoard, player.x, player.y, player.color);
		drawBullets(gameBoard, bullets);
		for(let i=0; i < aliens.length; i++){
			aliens = pruneDead(aliens);

			let alien = aliens[i];
			
			if(!alien.active)
				continue;
			
			for(let i=0; i < bullets.length; i++){
				if(bullets[i].y == alien.y && bullets[i].x == alien.x && bullets[i].active){
					alien.active = false
					bullets[i].active = false
				}
			}


			if(gameClock % calcSpeed(alien.speed, refrashRate) == 0){
				if(!moveAlien(gameBoard, alien))
					alien.active = false;
			}	
			if(!alien.active)
				continue;
			drawAlien(gameBoard, alien.x, alien.y, alien.color);
			if(alien.y == player.y && alien.x == player.x-1 || alien.y == player.y && alien.x == player.x+1 || alien.y == player.y-1 && alien.x == player.x){
				alien.active = false;
				player.health --;
				if(player.health <= 0){
					gameOver = true;
					gameBoard = ones(dimentions[0], dimentions[1]);
					print(score);
					
					break;
				}
			}

		}


		await sleep(refrashRate);
		gameClock++;
		if(gameClock % 40 == 0)
			score++
		if(gameClock > 10000){
			gameOver = true;
			print(score)
		}
		loadMatrix(gameBoard);
	}
	singlton = false;
}

function moveDown(matrix, gameObject){
	if(gameObject.y < matrix.length - 1){
		gameObject.y++;
		return true;
	}
	else 
		return false;
}