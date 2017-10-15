const p5 = require('p5');

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight, true);
}

function setup() {
	windowResized();
}

function draw() {
	background('#000');
}

