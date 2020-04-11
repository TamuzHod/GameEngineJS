class Graphics {
	#privateC;
	#privateC_Context;
	#privateLastScene;
	#privateDimentions;
	constructor(canvasID = 'gc') {
		this.#privateC = document.getElementById(canvasID);
	    this.#privateC_Context = this.#privateC.getContext('2d');
	    this.j = 0;
	}

	addMouseEvent(event, func){
		this.#privateC.addEventListener(event, func); 
	}

	loadScene(Scene_){
		this.privateDimentions = [Scene_[0].length, Scene_.length]
		this.update(Scene_);
		this.#privateLastScene = Scene_
	}



	update(newScene){
		this.j++;
		console.time(this.j);
		let diffMap = getDiffs(newScene);
	    this.#privateC_Context.clearRect(0, 0, this.#privateC.width, this.#privateC.height);
		this.fillGrid();
		console.timeEnd(this.j);
	}

	fillGrid(){
		let binary = this.#privateScene.some(item => item.some(item => item !== 0  && item != 1));
		for(let c=0; c<this.privateDimentions[0]; c++){
			for(let r=0; r<this.privateDimentions[1]; r++){
				if(binary)
					this.fillCell(c,r,this.privateDimentions, this.#privateScene[r][c])
				else
					this.fillCell(c,r,this.privateDimentions, this.#privateScene[r][c] == 0 ? 'white' : 'black')

			}
		}
	}

	fillCell(x,y, dimentions, color){
		let sizeW = this.#privateC.width/(dimentions[0]);
		let sizeH = this.#privateC.height/(dimentions[1]);
		let size = sizeH < sizeW ? sizeH : sizeW;
		this.#privateC_Context.fillStyle = color;
		this.#privateC_Context.fillRect(x*size , y*size, size, size)
	}
}
