class SnakeBodyPart extends GameObject {
	constructor(x, y, next) {
		super({x,y,color: 'green', spirit: [[1]]});
		this.next = next;
		this.lastX = x;
		this.lastY = y;
	}

	// update() {
	// 	if(this.next.lastX != Math.floor(this.next.x) || this.next.lastY != Math.floor(this.next.y)){
	// 		this.lastX = Math.floor(this.x);
	// 		this.lastY = Math.floor(this.y);
	// 		this.x += this.next.lastX;
	// 		this.y += this.next.lastY;	
	// 	}
	// }
}
