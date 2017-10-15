const p5 = require("p5");

window.windowResized = function(){
	resizeCanvas(windowWidth, windowHeight);
}

window.setup = function() {
	windowResized();
}

window.a = 1;

window.gain = 1;

window.addEventListener("keydown", function(){
	window.a = (1 - window.a);
});

let max = [-1, -1, -1, -1];
let oldValue = [255, 255, 255, 255];

function getColor(a){
	if(window.spectrum == undefined){
		return 0;
	} else {
		let sep = Math.floor(window.spectrum.length / 3.1);

		let value = window.spectrum[sep * a] * 10000;

		if(value > max[a]){
			max[a] = value;
		}

		if(isNaN(oldValue[a])){
			oldValue[a] = 255;
		}

		max[a] = 0.99 * max[a] + 0.01 * value;

		value = ((value / max[a]) * 255) * 0.2 + 0.7 * oldValue[a];

		oldValue[a] = value;

		return value / (3.01 - a);
	}
}

window.draw = function() {
	background(getColor(0), getColor(1), getColor(2));

	window.k = ((mouseX / windowWidth) * 10) - 5;
	window.gain = mouseY / windowHeight;

	ellipse(mouseX, mouseY, 80, 80);
}

