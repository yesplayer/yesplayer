const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const newAudioBuffer = require("./newAudioBuffer");
const speed = require("./speed");

newAudioBuffer("file:///home/nemanjan00/Music/Luis Fonsi feat. Daddy Yankee/Despacito/01 Despacito.mp3").then((buffer) => {
	const gainNode = audioCtx.createGain();

	gainNode.gain.value = 1;

	const speedInstance = speed(audioCtx, buffer, gainNode);
	speedInstance.speed = 1.1;

	let i = 0;

	setInterval(function(){
		i += 0.1;

		speedInstance.speed = Math.abs(Math.sin(i)) * 2;
	}, 100);

	gainNode.connect(audioCtx.destination);
});

