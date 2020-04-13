class Alien extends GameObject {
	constructor(x,y,z, color){
		super({
			x, y, z, speedX: 0.1, speedY: -0.5, color,
			spirit: [
				[1, 1, 1],
				[-1, 1, -1],
				[-1, 1, -1]
			],
			scale: 2,
		});
	}
}
