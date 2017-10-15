const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const newAudioBuffer = require("./newAudioBuffer");

const source = audioCtx.createBufferSource();

newAudioBuffer("file:///home/nemanjan00/Music/Elvis Presley/Jailhouse Rock/01 Jailhouse Rock.mp3").then((buffer) => {
	source.buffer = buffer;

	const gainNode = audioCtx.createGain();

	source.connect(gainNode);
	source.start(0);

	gainNode.gain.value = 3;

	gainNode.connect(audioCtx.destination);
});

