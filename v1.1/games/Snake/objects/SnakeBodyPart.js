class SnakeBodyPart extends GameObject {
	constructor(x, y, next) {
		super({x,y,color: 'green', spirit: [[1]]});
		this.next = next;
		this.lastX = x;
		this.lastY = y;
	}

	update() {
		if(this.next.lastX != Math.round(this.next.x) || this.next.lastY != Math.round(this.next.y)){
			this.lastX = Math.round(this.x);
			this.lastY = Math.round(this.y);
			this.x = this.next.lastX;
			this.y = this.next.lastY;	
			console.log()
		}
	}
}
