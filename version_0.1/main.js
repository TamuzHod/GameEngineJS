let singlton = false;

function run(){
	clear();
	let row   = parseInt((document.getElementById('input_row').value));
	let col  = parseInt((document.getElementById('input_col').value));
	let size  = parseInt((document.getElementById('input_size').value));

	playGame();
}


function colorCell(matrix,x,y,color){
	if(y < 0 || x < 0 || y >= matrix.length || x >= matrix[0].length){
		print('Warning: index out of bounds ' + [x,y])
		return
	}

	matrix[y][x] = color;
}

function randomSqure(matrix){

	for(let i=0; i < Math.pow(matrix[0].length * matrix.length, 1/3) ; i++){
		let size = random(i);
		let xRand = random(matrix[0].length - size);
		let yRand = random(matrix.length - size);
		let r = random(255)
		let b = random(255)
		let g = random(255)
		let color = '#' + r + g + b
		square(matrix, yRand, xRand, size, color);
	}
	return matrix;
}

function square(matrix, row, col,size, color){
	for(let r=row; r < row + size; r++){
		for(let c=col; c < col + size; c++){
			matrix[r][c] = color;
		}
	}
	return matrix;
}

function checkers(row,col){
	let arr2D = [];
	for(let r=0; r < row; r++){
		arr2D[r] = [];
		for(let c=0; c < col; c++){
			if(r % 2 == 0 && c % 2 == 0)
				arr2D[r][c] = 0;
			else if(r % 2 == 0 && c % 2 == 1)
				arr2D[r][c] = 1;
			else if(r % 2 == 1 && c % 2 == 0)
				arr2D[r][c] = 1;
			else
				arr2D[r][c] = 0;
		}
	}
	return arr2D;
}

function ones(row,col){
	let arr2D = [];
	for(let c=0; c < col; c++){
		arr2D[c] = [];
		for(let r=0; r < row; r++){
			arr2D[c][r] = 'black';
		}
	}
	return arr2D;
}

function zeros(row,col){
	let arr2D = [];
	for(let c=0; c < col; c++){
		arr2D[c] = [];
		for(let r=0; r < row; r++){
			arr2D[c][r] = 'white';
		}
	}
	return arr2D;
}	

function stripe(row, col){
	let arr2D = [];
	for(let c=0; c < col; c++){
		arr2D[c] = [];
		for(let r=0; r < row; r++){
			if(r % 2 == 0){
				arr2D[c][r] = 0;
			}
			else{
				arr2D[c][r] = 1;
			}
		}
	}
	return arr2D;
}

function line(row,col){
	let arr2D = [];
	for(let c=0; c < col; c++){
		arr2D[c] = [];
		for(let r=0; r < row; r++){
			if(c % 2 == 0){
				arr2D[c][r] = 0; 
			}
			else{
				arr2D[c][r] = 1;	
			}
		}
	}
	return arr2D;
}

function random(celing){
	return Math.floor((Math.random() * celing));
}


function print(text) {
  var para = document.createElement("P");
  para.innerHTML = text;
  document.getElementById('output_div').appendChild(para);
  console.log(text);
}

function clear() {
  document.getElementById('output_div').innerHTML = '';
}