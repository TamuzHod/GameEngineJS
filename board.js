class Board {
	#privateC;
	#privateC_Context;
	#privateMatrix;
	#graphicRR = 30;
	#physicsRR = 1000;

	constructor(canvasID = 'gc', dimentionsX, dimentionsY, gameObjects) {
		this.#privateC = document.getElementById(canvasID);
	    this.#privateC_Context = this.#privateC.getContext('2d');
	    this.privateMatrix = Array(dimentionsX).fill(Array(dimentionsY));
	    this.gameObjects = gameObjects;

	}

	#updatePhysics = function(){
		this.gameObjects.forEach(function(entity) {
			entity.update();
		});

		let posDic = {};
		this.gameObjects.forEach(function(entity, i) {
			let sprit = entity.draw();
			for(i = sprit.x - sprit.centerGravX; i<spirit.shape[0].length; i++){
				for(j = sprit.y - sprit.centerGravY; j<spirit.shape.length; j++){
					if([i,j,spirit.z] in posDic){
						posDic[[i,j,spirit.z]] = {
							this.color = sprit.color,
							this.ids = [id]
						}
					}
					else {
						posDic[[i,j,spirit.z]].ids.push(i)
					}
				}
			}	
		});

		 // find collisions		
		let collisions = {};
		for (const [key, value] of Object.entries(posDic)) {
			console.log(key, value);
		}
		 

	}

	#sleep = function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	};

	addMouseEvent(event, func){
		this.#privateC.addEventListener(event, func); 
	}

}