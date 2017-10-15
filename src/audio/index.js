const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const newAudioBuffer = require("./newAudioBuffer");

const source = audioCtx.createBufferSource();

newAudioBuffer("file:///home/nemanjan00/Music/Elvis Presley/Jailhouse Rock/01 Jailhouse Rock.mp3").then((buffer) => {
	window.buffer = buffer;

	source.buffer = buffer;

	const scriptNode = audioCtx.createScriptProcessor(4096, 0, 2);

	let i = 0;

	scriptNode.onaudioprocess = function(audioProcessingEvent) {
		var outputBuffer = audioProcessingEvent.outputBuffer;

		buffer.copyFromChannel(outputBuffer.getChannelData(0), 1, i * 4096);
		buffer.copyFromChannel(outputBuffer.getChannelData(1), 1, i++ * 4096);
	}

	scriptNode.connect(audioCtx.destination);
});

