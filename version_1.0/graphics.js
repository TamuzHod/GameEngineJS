class Graphics {
	#privateC;
	#privateCTX;
	#privateLastScene;
	#privateDimentions;
	#privateBackGroundC

	constructor(canvasID,canvasBackID, backImgSrc=null, dimX, dimY) {
		this.#privateC = document.getElementById(canvasID);
		let parentDiv = this.#privateC.parentNode;
		parentDiv.style.width = dimX + 'px';
		parentDiv.style.height = dimY+ 'px';
		this.#privateC.width  = dimX;
  		this.#privateC.height = dimY;


	    this.#privateCTX = this.#privateC.getContext('2d');
	    this.#privateBackGroundC = document.getElementById(canvasBackID);
		this.#privateBackGroundC.width  = dimX;
  		this.#privateBackGroundC.height = dimY;

  		if(backImgSrc){
  			let backImg = new Image();
  			let that = this;
  			backImg.onload = function(){ 
  				that.drawBackGround(backImg);
  			};
			backImg.src = backImgSrc;
			backImg.width = dimX;
			backImg.height = dimY
  		}

  		
	    this.j = 0;
	}

	drawBackGround(backImg){
		let ctx = this.#privateBackGroundC.getContext('2d');
		ctx.drawImage(backImg, 0, 0, this.#privateBackGroundC.width, this.#privateBackGroundC.height);
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
		let imageData = this.#privateCTX.getImageData(0, 0, this.#privateC.width,this.#privateC.height);
		let pixels = imageData.data;
		let off;
		for(let col=0; col<newScene.length; col++){
			for(let row=0; row<newScene[0].length; row++){
				let r = newScene[col][row][0];
				let g = newScene[col][row][1];
				let b = newScene[col][row][2];
				let o = newScene[col][row][3];

				off = (col *this.#privateC.width + row) * 4;
				pixels[off] = r;
			    pixels[off + 1] = g;
			    pixels[off + 2] = b;
			    pixels[off + 3] = o;
			}
		}
		this.#privateCTX.putImageData(imageData, 0, 0);
	}

	
}
