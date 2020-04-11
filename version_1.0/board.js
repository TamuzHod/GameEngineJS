class Board {
	#privateC;
	#privateCTX;
	#privateScene;
	#physicsRR =  Math.floor(2);
	#garphicEngine;
	#dimentionsX;
	#dimentionsY;
	#physicsLoop;
	#stop = true;


	constructor(dimentionsX=600, dimentionsY=600, gameObjects, backgroundColor = 'white', canvasID = 'gc') {
		this.#privateC = document.getElementById(canvasID);
	    this.#privateCTX = this.#privateC.getContext('2d');
	    this.#privateScene = Array(dimentionsX).fill(Array(dimentionsY));
	    this.#dimentionsX = dimentionsX;
	    this.#dimentionsY = dimentionsY;
	    this.gameObjects = gameObjects;
	    this.backgroundColor = backgroundColor;
	    this.#garphicEngine = new Graphics(canvasID);
	}

	eventDelegator(event){
		event.preventDefault();
		this.gameObjects.forEach(function (entity){
			if(entity.handleEvent){
				entity.handleEvent(event);
			}
		});

	}

	startGame(){
		let that = this;
		this.#physicsLoop = setInterval(that.updatePhysics.bind(this), this.#physicsRR);
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
		const posDic = {};
		const that = this;
		this.gameObjects.forEach(function (entity, index) {
			let sprit = entity.draw();
			let i_start = sprit.pos[0] - sprit.centerGrav[0];
			let j_start = sprit.pos[1] - sprit.centerGrav[1];
			let z = sprit.pos[2];
			for(let i= i_start; i< i_start+sprit.shape[0].length; i++){
				for(let j= j_start; j< j_start+sprit.shape.length; j++){
					if(i < 0 || j < 0 || i >= that.#dimentionsX || j >= that.#dimentionsY)
						continue;
					if(sprit.shape[j-j_start][i-i_start] == -1)
						continue;

					if([i,j,z] in posDic){
						posDic[[i,j,z]].ids.push(index);
					} else{
						posDic[[i,j,z]] = {
							color : sprit.color,
							ids : [index]
						}
					}
				}
			}
		});
		return posDic;
	}

	updatePhysics(){
		let posDic = this.getPos();

		this.gameObjects.forEach(function (entity) {
			entity.update();
		});

		posDic = this.getPos();

		let collisions = {};
		for (const obj of Object.values(posDic)) {
			if(obj.ids.length < 1)
				continue;
			obj.ids.forEach(function (id_0) {
				obj.ids.forEach(function (id_1) {
					if(id_0 in collisions){
						collisions[id_0][id_1] = true;
					} else{
						collisions[id_0] = {id_1 : true};
					}
				});
			});
		}

		posDic = this.getPos();

	}

	updateGraphics(){
		this.#privateScene = []; //Array(this.#privateScene[0].length).fill(Array(this.#privateScene.length));
		for (var i = 0; i < this.#dimentionsY; i++) {
		    this.#privateScene[i] = [];
		    for (var j = 0; j < this.#dimentionsX; j++) {
		        this.#privateScene[i][j] = null;
		    }
		}
		let posDic = this.getPos();

		for (const [pos_str, value] of Object.entries(posDic)) {
			let pos = pos_str.split`,`.map(x=>+x);
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
		let that = this;
		if(!this.#stop)
			window.requestAnimationFrame(that.updateGraphics.bind(this));

	}
	
}