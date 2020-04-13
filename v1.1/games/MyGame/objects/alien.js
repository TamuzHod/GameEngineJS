class Alien extends GameObject {
	constructor(x,y,z, color){
		super({
			x, y, z, speedX: 10, speedY: -20, color,
			spirit: [
				[1, 1, 1],
				[-1, 1, -1],
				[-1, 1, -1]
			],
			scale: 2,
		});
	}
}
