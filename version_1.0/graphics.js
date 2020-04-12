class Graphics {
	#privateC;
	#privateCTX;
	#privateLastScene;
	#privateDimentions;
	#privateBackGroundC

	constructor(scaleFactor, canvasID,canvasBackID, backImgSrc=null, dimX, dimY) {
		this.#privateC = document.getElementById(canvasID);
		let parentDiv = this.#privateC.parentNode;
		this.scaleFactor = scaleFactor;
		parentDiv.style.width  = dimX * scaleFactor+ 'px';
		parentDiv.style.height = dimY * scaleFactor + 'px';
		this.#privateC.width  = dimX * scaleFactor;
  		this.#privateC.height = dimY * scaleFactor;
  		this.tempCanvas=document.createElement("canvas");
		this.tctx=this.tempCanvas.getContext("2d");

		this.tempCanvas.width=dimX;
		this.tempCanvas.height=dimY;


	    this.#privateCTX = this.#privateC.getContext('2d');
	    toggleSmoothing(this.#privateCTX);

	    this.#privateBackGroundC = document.getElementById(canvasBackID);
		this.#privateBackGroundC.width  = dimX * scaleFactor;
  		this.#privateBackGroundC.height = dimY * scaleFactor;

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
		// let diffMap = getDiffs(newScene);
	    this.#privateCTX.clearRect(0, 0, newScene.length, newScene[0].length);
		this.fillGrid(newScene);
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

		this.tctx.putImageData(imageData, 0, 0);
		this.#privateCTX.clearRect(0,0, this.#privateC.width, this.#privateC.height);
		this.#privateCTX.drawImage(this.tempCanvas,0,0,this.tempCanvas.width, this.tempCanvas.height, 0, 0, this.#privateC.width, this.#privateC.height);
	}

	
}

function toggleSmoothing(ctx){
	ctx.imageSmoothingEnabled = !ctx.imageSmoothingEnabled;
    ctx.mozImageSmoothingEnabled = !ctx.imageSmoothingEnabled;
    ctx.webkitImageSmoothingEnabled = !ctx.imageSmoothingEnabled;
    ctx.msImageSmoothingEnabled = !ctx.imageSmoothingEnabled;
}