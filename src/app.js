const p5 = require("p5");

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	windowResized();
}

function draw() {
	background("#000");

	if (mouseIsPressed) {
		fill(0);
	} else {
		fill(255);
	}

	ellipse(mouseX, mouseY, 80, 80);
}

