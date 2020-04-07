
class GameObject {
	static counter = 0;

	constructor(x,y,z,speedX,speedY,color, sprit, centerGrav = null) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.color = color;
		this.speedX = speedX;
		this.speedY = speedY;
		this.sprit = sprit;
		this.centerGravX = centerGrav != null ? centerGrav[0] : Math.floor(sprit[0].length / 2);
		this.centerGravY = centerGrav != null ? centerGrav[1] : Math.floor(sprit.length / 2);

		this.id = GameObject.counter++;
	}

	update() { 
		this.x += this.speedX;
		this.y += this.speedY;
	}

	draw(){
		return {
			shape : this.sprit,
			centerGrav : [this.centerGravX,this.centerGravY],
			pos : [this.x,this.y,this.z].map(function(each_element){
					    return Math.round(each_element);
					}),
			color : this.color
		};
	}

}

class Alien extends GameObject {
	constructor(x,y,z, color){
		super(x,y,z,0.002,0.002, color, 
			[
			[1,1,1],
			[-1,1,-1],
			[-1,1,-1]
			]);
	}
}
