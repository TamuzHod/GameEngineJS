class Graphics {
	#privateC;
	#privateCTX;
	#privateLastScene;
	#privateDimentions;
	#privateBackGroundC;

	constructor(scaleFactor, canvasID,canvasBackID, backImgSrc=null, dimX, dimY) {
		this.#privateC = document.getElementById(canvasID);
		let parentDiv = this.#privateC.parentNode;
		this.scaleFactor = scaleFactor;
		parentDiv.style.width  = dimX * scaleFactor+ 'px';
		parentDiv.style.height = dimY * scaleFactor + 'px';
		this.#privateC.width  = dimX;// * scaleFactor;
  		this.#privateC.height = dimY;// * scaleFactor;
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


	    this.frameCount = 0;
  		this.fps = 0;
  		this.ts = new Date();
  		this.physicCount = 0;
  		this.PPS = 0;
	}


	drawBackGround(backImg){
		let ctx = this.#privateBackGroundC.getContext('2d');
		ctx.drawImage(backImg, 0, 0, this.#privateBackGroundC.width, this.#privateBackGroundC.height);
	}

	addMouseEvent(event, func){
		this.#privateC.addEventListener(event, func);
	}

	loadScene(Scene_){
		this.update(Scene_);
	}


	update(newScene){
		this.frameCount++;
		const start = new Date();
		// let diffMap = getDiffs(newScene);
	    this.#privateCTX.clearRect(0, 0, this.#privateC.width, this.#privateC.height);
		this.fillGrid(newScene);
		const now = new Date();
		if((now - this.ts) > 1000) {
			this.fps = this.frameCount;
			this.frameCount = 0;
			this.ts = now;
			this.PPS = this.physicCount;
			this.physicCount = 0;
		}
		const info = `Frame rendering: ${(new Date() - start)} ms   fps: ${this.fps}   PhysPS: ${this.PPS}`;
		document.getElementById("Misc").innerHTML = info;
	}

	getImgData(){
		return  this.#privateCTX.getImageData(0, 0, this.#privateC.width,this.#privateC.height);;
	}

	fillGrid(posDic){
		// let imageData = this.tctx.getImageData(0, 0, this.tempCanvas.width,this.tempCanvas.height);
		const posColorMap = new EquivalentKeyMap();
		let imageData = new ImageData(this.tempCanvas.width, this.tempCanvas.height);
		let off;
		let rgbo;
		let that = this;
		posDic.forEach(function(value, pos){
			if (!posColorMap.has([pos[0], pos[1]]) || posColorMap.get([pos[0], pos[1]]) < pos[2]){

				posColorMap.set([pos[0], pos[1]], pos[2]);

				off = (pos[1] * that.tempCanvas.width + pos[0]) * 4;
				imageData.data[off] = value.color[0];
			    imageData.data[off + 1] = value.color[1];
			    imageData.data[off + 2] = value.color[2];
			    imageData.data[off + 3] = value.color[3];
			}
		});
		this.#privateCTX.putImageData(imageData, 0, 0);
		this.#privateC.style.transformOrigin = '0 0'; //scale from top left
		this.#privateC.style.transform = 'scale(' + this.scaleFactor + ')';
		// this.tctx.putImageData(imageData, 0, 0);
		// this.#privateCTX.clearRect(0,0, this.#privateC.width, this.#privateC.height);
		// this.#privateCTX.drawImage(this.tempCanvas,0,0,this.tempCanvas.width, this.tempCanvas.height, 0, 0, this.#privateC.width, this.#privateC.height);
	}


}

function toggleSmoothing(ctx){
	// ctx.imageSmoothingEnabled = false;
 //    ctx.mozImageSmoothingEnabled = false;
 //    ctx.webkitImageSmoothingEnabled = false;
 //    ctx.msImageSmoothingEnabled = false;
}