function drawPlayer(matrix,x,y,color){
	matrix[y][x] = color;
	matrix[y-1][x] = color;
	matrix[y][x-1] = color;
	matrix[y][x+1] = color;
}

function moveLeft(matrix, gameObject){
	if(gameObject.x > 1){
		gameObject.x--;
			return true;
	}
	else 
		return false;
}

function moveRight(matrix, gameObject){
	if(gameObject.x < matrix[0].length - 2){
		gameObject.x++;
		return true;
	}
	else 
		return false;
}

function shoot(matrix, gameObject){
	let bullet = {x : gameObject.x, y : gameObject.y - 2, active : true};
	bullets.push(bullet);
}

function drawBullets(matrix, bullets){
	for(let i=0; i < bullets.length; i++){
		if(bullets[i].y > 0 && bullets[i].active){
			matrix[bullets[i].y][bullets[i].x] = 'red';
			bullets[i].y--;
		}
	}
}

function keyHandler(matrix, player, key){
	if(key.keyCode == 39)
		moveRight(matrix, player);
	if(key.keyCode == 37)
		moveLeft(matrix, player);
	if(key.keyCode == 32)
		shoot(matrix, player);
}
