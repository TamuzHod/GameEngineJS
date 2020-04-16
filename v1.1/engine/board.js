
class Board {
	#privateC;
	#privateCTX;
	#privateScene;
	#physicsTickLength =  5;
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
	    this.gameObjectsMap = new Map();
	    for(let i = 0; i< gameObjects.length; i++) {
	    	const obj = gameObjects[i];
	    	obj.color = typeof obj.color  == "string" ? colorToRGBA(obj.color) : obj.color;
	    	this.gameObjectsMap.set(obj.id,obj);
		}

	    if(backImg){
	    	this.backgroundColor = [0,0,0,0];
	    }
	    else
	    	this.backgroundColor = typeof backgroundColor  == "string" ? colorToRGBA(backgroundColor) : backgroundColor;
	    this.#garphicEngine = new Graphics(scaleFactor, canvasID,backCanvasId,backImg, dimentionsX, dimentionsY);
	    this.graphicCounter=0;
	}

	deleteEntity(entityID){
		this.gameObjectsMap.get(entityID).active = false;
	}

	addEntity(entity){
		this.fixColor(entity);
		this.gameObjects.push(entity)
		this.gameObjectsMap.set(entity.id, entity);
	}

	getEntityByID(entityID){
		return this.gameObjectsMap.get(entityID);
	}

	cleanEntityMap(){
		let newEntityList = [];
		for(let i = 0; i< this.gameObjects.length; i++) {
			const obj = this.gameObjects[i];
			if(obj.active){
				newEntityList.push(obj)
			} else{
	    		this.gameObjectsMap.delete(obj.id);
			}
		}
		this.gameObjects = newEntityList;
	}

	// call this if colors ever change
	fixColor(entity){
		return entity.color = typeof entity.color  == "string" ? colorToRGBA(entity.color) : entity.color;
	}


	eventDelegator(event){
		event.preventDefault();
		this.gameObjects.filter( (entity) => entity.active).forEach(function (entity){
			if(entity.handleEvent){
				entity.handleEvent(event);
			}
		});

	}

	resumeGame(){
		this.#stop = false;
		let that = this;
		this.#physicsLoop = setInterval(that.updatePhysics.bind(this), this.#physicsTickLength);
	}

	startGame(){
		let that = this;
		this.#physicsLoop = setInterval(that.updatePhysics.bind(this), this.#physicsTickLength);
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

	getPos(){
		const posDic = new EquivalentKeyMap();
		const that = this;
		this.gameObjects.filter( (entity) => entity.active).forEach(function (entity) {
			let spirit = entity.draw();
			let i_start = spirit.pos[0] - spirit.centerGrav[0];
			let j_start = spirit.pos[1] - spirit.centerGrav[1];
			let z = spirit.pos[2];
			for(let i= i_start; i< i_start+spirit.shape[0].length; i++){
				for(let j= j_start; j< j_start+spirit.shape.length; j++){
					if(i < 0 || j < 0 || i >= that.#dimentionsX || j >= that.#dimentionsY)
						continue;
					if(spirit.shape[(j-j_start)][(i-i_start)] <= 0)
						continue;
					if (posDic.has([i, j, z])) {
						posDic.get([i, j, z]).ids.push(entity.id);
					} else {
						posDic.set([i, j, z],{
							color: spirit.color,
							ids: [entity.id]
						});
					}
				}
			}
		});
		return posDic;
	}

	updatePhysics(){

		this.#garphicEngine.physicCount++;
		this.gameObjects.filter( (entity) => entity.active).forEach(function (entity) {
			entity.update();
		});

		let posDic = this.getPos();

		let collisions = new Map();
		posDic.forEach(function(value){
			if(value.ids.length < 1)
				return;
			value.ids.forEach(function (id_0) {
				value.ids.forEach(function (id_1) {
					if(id_1 === id_0)
						return;
					if(collisions.has(id_0)){
						collisions.get(id_0).set(id_1, true);
					} else{
						collisions.set(id_0, new Map([[id_1, true]]));
					}
				});
			});
		});

		collisions.forEach((collisionMap, id) => {
			this.gameObjectsMap.get(id).onCollision && this.gameObjectsMap.get(id).onCollision(collisionMap);
		});
	}

	updateGraphics(){
		if(this.#stop)
			return;
		if(this.graphicCounter % 10 == 0)			
				this.cleanEntityMap();
		let that = this;
		if(this.graphicCounter++ % 2 == 0){
			let posDic = this.getPos();
			this.#garphicEngine.loadScene(posDic);
		}
		window.requestAnimationFrame(that.updateGraphics.bind(this));
	}

}

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