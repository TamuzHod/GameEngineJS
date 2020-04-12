
function colorToRGBA(color) {
    // Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
    // color must be a valid canvas fillStyle. This will cover most anything
    // you'd want to use.
    // Examples:
    // colorToRGBA('red')  # [255, 0, 0, 255]
    // colorToRGBA('#f00') # [255, 0, 0, 255]
    var cvs, ctx;
    cvs = document.createElement('canvas');
    cvs.height = 1;
    cvs.width = 1;
    ctx = cvs.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
}




class Board {
	#privateC;
	#privateCTX;
	#privateScene;
	#physicsTickLength =  10;
	#garphicEngine;
	#dimentionsX;
	#dimentionsY;
	#physicsLoop;
	#stop = true;


	constructor(scaleFactor=5, dimentionsX=600, dimentionsY=600, gameObjects,backImg=null, backgroundColor = 'white', canvasID = 'gameC', backCanvasId='backGroundC') {
		this.#privateC = document.getElementById(canvasID);
	    this.#privateCTX = this.#privateC.getContext('2d');
	    this.#privateScene = Array(dimentionsX).fill(Array(dimentionsY));
	    this.#dimentionsX = dimentionsX;
	    this.#dimentionsY = dimentionsY;
	    this.gameObjects = gameObjects;
	    if(backImg){
	    	this.backgroundColor = [0,0,0,0];
	    }
	    else
	    	this.backgroundColor = typeof backgroundColor  == "string" ? colorToRGBA(backgroundColor) : backgroundColor;
	    this.#garphicEngine = new Graphics(scaleFactor, canvasID,backCanvasId,backImg, dimentionsX, dimentionsY);
	    this.phyicCounter=0;
	    this.graphicCounter=0;

	}

	// call this if colors ever change
	fixCollors(){
		this.gameObjects.forEach(function (entity) {
			entity.color = typeof entity.color  == "string" ? colorToRGBA(entity.color) : entity.color;
		});
	}


	eventDelegator(event){
		event.preventDefault();
		this.gameObjects.forEach(function (entity){
			if(entity.handleEvent){
				entity.handleEvent(event);
			}
		});

	}

	printFPS(){
		document.getElementById('FPS').innerHTML = 'FPS ' + (this.graphicCounter / 3);
		this.graphicCounter = 0;
		document.getElementById('FPS_phyisics').innerHTML = 'physics loop ' + (this.phyicCounter);
		this.phyicCounter = 0;
	}

	startGame(){
		this.fixCollors(); //I know this is ugly
		let that = this;
		this.#physicsLoop = setInterval(that.updatePhysics.bind(this), this.#physicsTickLength);
		setInterval(that.printFPS.bind(this), 1000);
		window.requestAnimationFrame(that.updateGraphics.bind(this));
		window.addEventListener('keydown', function (e) {
            that.eventDelegator(e);
        })
        document.addEventListener('keypress', function (e) {
            that.eventDelegator(e);
        })
        window.addEventListener('keyup', function (e) {
            that.eventDelegator(e);
        })
        this.#stop = false;
	}

	pauseGame(){
		clearInterval(this.#physicsLoop);
		this.#stop = true;
	}

	getPos_scale(){
		const posDic = new Map();
		const that = this;
		this.gameObjects.forEach(function (entity, index) {
			let spirit = entity.draw();
			let scale = spirit.scale || 10;
			let i_start = spirit.pos[0] - spirit.centerGrav[0];
			let j_start = spirit.pos[1] - spirit.centerGrav[1];
			let z = spirit.pos[2];
			for(let i= i_start; i< i_start+spirit.shape[0].length * scale; i++){
				for(let j= j_start; j< j_start+spirit.shape.length *scale; j++){
					if(i < 0 || j < 0 || i >= that.#dimentionsX || j >= that.#dimentionsY)
						continue;
					if(spirit.shape[((j-j_start) / scale) | 0][((i-i_start) / scale) | 0] == -1)
						continue;
					if (posDic.has([i, j, z])) {
						posDic.get([i, j, z]).ids.push(index);
					} else {
						posDic.set([i, j, z],{
							color: spirit.color,
							ids: [index]
						});
					}
				}
			}
		});
		return posDic;
	}

	getPos(){
		const posDic = new Map();
		const that = this;
		this.gameObjects.forEach(function (entity, index) {
			let spirit = entity.draw();
			let i_start = spirit.pos[0] - spirit.centerGrav[0];
			let j_start = spirit.pos[1] - spirit.centerGrav[1];
			let z = spirit.pos[2];
			for(let i= i_start; i< i_start+spirit.shape[0].length; i++){
				for(let j= j_start; j< j_start+spirit.shape.length; j++){
					if(i < 0 || j < 0 || i >= that.#dimentionsX || j >= that.#dimentionsY)
						continue;
					if(spirit.shape[(j-j_start)][(i-i_start)] == -1)
						continue;
					if (posDic.has([i, j, z])) {
						posDic.get([i, j, z]).ids.push(index);
					} else {
						posDic.set([i, j, z],{
							color: spirit.color,
							ids: [index]
						});
					}
				}
			}
		});
		return posDic;
	}

	updatePhysics(){
	console.time('updatePhysics')
		this.phyicCounter++;
		this.gameObjects.forEach(function (entity) {
			entity.update();
		});

		let posDic = this.getPos();

		let collisions = new Map();
		for (const obj of posDic.values()) {
			if(obj.ids.length < 1)
				continue;
			obj.ids.forEach(function (id_0) {
				obj.ids.forEach(function (id_1) {
					if(collisions.has(id_0)){
						collisions.get(id_0).set(id_1, true);
					} else{
						collisions.set(id_0, new Map([[id_1, true]]));
					}
				});
			});
		}
	console.timeEnd('updatePhysics')
	}

	updateGraphics(){

		this.graphicCounter++;
		if(this.graphicCounter % 3 == 0){
			this.#privateScene = []; //Array(this.#privateScene[0].length).fill(Array(this.#privateScene.length));
			for (var i = 0; i < this.#dimentionsY; i++) {
			    this.#privateScene[i] = [];
			    for (var j = 0; j < this.#dimentionsX; j++) {
			        this.#privateScene[i][j] = null;
			    }
			}
			let posDic = this.getPos();
			for (const [pos, value] of posDic) {
				if(!this.#privateScene[pos[1]][pos[0]] || this.#privateScene[pos[1]][pos[0]].z < pos[2]){
					this.#privateScene[pos[1]][pos[0]] = {color : value.color, z : pos[2]};
				}
			}
			for (var i = this.#privateScene[0].length - 1; i >= 0; i--) {
				for (var j = this.#privateScene.length - 1; j >= 0; j--) {
					this.#privateScene[j][i] = this.#privateScene[j][i] != null ? this.#privateScene[j][i].color : this.backgroundColor;
				}
			}
			this.#garphicEngine.loadScene(this.#privateScene);
		}
		let that = this;
		if(!this.#stop)
			window.requestAnimationFrame(that.updateGraphics.bind(this));
	}

}
