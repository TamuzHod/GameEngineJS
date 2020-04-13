
class GameObject {
	static counter = 0;

	constructor({x,y,z,speedX,speedY,color, spirit, scale=1, centerGrav = null}) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.color = color;
		this.speedX = speedX;
		this.speedY = speedY;
		this.spirit = spirit;
		this.scale = scale;
		this.centerGravX = centerGrav != null ? centerGrav[0] : Math.floor(spirit[0].length / 2);
		this.centerGravY = centerGrav != null ? centerGrav[1] : Math.floor(spirit.length / 2);

		this.id = GameObject.counter++;
	}

	update() {
		this.x += this.speedX;
		this.y += this.speedY;
	}

	draw(){
		return {
			shape : this.spirit,
			centerGrav : [this.centerGravX,this.centerGravY],
			pos : [this.x,this.y,this.z].map(function(each_element){
					    return Math.round(each_element);
					}),
			color : this.color
		};
	}

}


