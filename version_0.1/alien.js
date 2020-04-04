function drawAlien(matrix,x,y){
	if(y < 0 || x < 0 || y >= matrix.length || x >= matrix[0].length){
		print('Warning: index out of bounds ' + [x,y])
		return
	}

	matrix[y][x] = 'black';
}

function calcSpeed(speed, refrashRate){
	return parseInt((1000 / refrashRate) / speed)
}

function pruneDead(aliens){
	let newAliens = []
	let j = 0
	for(let i=0; i < aliens.length; i++){
		let alien = aliens[i];
		if(alien.active){
			newAliens[j] = aliens[i];
			j++
		}
	}
	return newAliens;
}

function moveAlien(matrix, gameObject){
	return moveDown(matrix, gameObject)
}