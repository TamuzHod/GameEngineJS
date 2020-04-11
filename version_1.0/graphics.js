class Graphics {
	#privateC;
	#privateCTX;
	#privateLastScene;
	#privateDimentions;
	constructor(canvasID = 'gc') {
		this.#privateC = document.getElementById(canvasID);
	    this.#privateCTX = this.#privateC.getContext('2d');
	    this.j = 0;
	}

	addMouseEvent(event, func){
		this.#privateC.addEventListener(event, func); 
	}

	loadScene(Scene_){
		this.#privateDimentions = [Scene_[0].length, Scene_.length]
		this.update(Scene_);
		this.#privateLastScene = Scene_
	}



	update(newScene){
		this.j++;
		console.time(this.j);
		// let diffMap = getDiffs(newScene);
	    this.#privateCTX.clearRect(0, 0, this.#privateC.width, this.#privateC.height);
		this.fillGrid(newScene);
		console.timeEnd(this.j);
	}

	fillGrid(newScene){
		let imageData = this.#privateCTX.getImageData(0, 0, 600,600);
		let pixels = imageData.data;
		let off;
		for(let col=0; col<newScene[0].length; col++){
			for(let row=0; row<newScene.length; row++){
				let r = newScene[col][row];
				let g = 0;
				let b = 0;
				off = (col *this.#privateC.width + row) * 4;
				pixels[off] = r;
			    pixels[off + 1] = g;
			    pixels[off + 2] = b;
			    pixels[off + 3] = 255;
			}
		}
		this.#privateCTX.putImageData(imageData, 0, 0);
	}

	
}
