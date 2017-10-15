const p5 = require("p5");

window.windowResized = function(){
	resizeCanvas(windowWidth, windowHeight);
}

window.setup = function() {
	windowResized();
}

window.draw = function() {
	background("#000");

	if (mouseIsPressed) {
		fill(0);
	} else {
		fill(255);
	}

	ellipse(mouseX, mouseY, 80, 80);
}

