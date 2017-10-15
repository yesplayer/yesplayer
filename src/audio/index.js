const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const newAudioBuffer = require("./newAudioBuffer");

const source = audioCtx.createBufferSource();

newAudioBuffer("file:///home/nemanjan00/Music/Elvis Presley/Jailhouse Rock/01 Jailhouse Rock.mp3").then((buffer) => {
	window.buffer = buffer;

	source.buffer = buffer;

	const scriptNode = audioCtx.createScriptProcessor(4096, 0, 2);

	let i = 0;
	let buffer1 = buffer;

	scriptNode.onaudioprocess = function(audioProcessingEvent) {
		let outputBuffer = audioProcessingEvent.outputBuffer;

		let buffer = buffer1;

		i++;

		for(channelNumber = 0; channelNumber < 2; channelNumber++){
			let input = buffer.getChannelData(channelNumber);
			let out = outputBuffer.getChannelData(channelNumber);

			for(j = 0; j < out.length; j += 2){
				out[j] = input[(i * 2048) + (j / 2)];
				out[j + 1] = input[(i * 2048) + (j / 2)];
			}

			console.log(out);
		}
	}

	scriptNode.connect(audioCtx.destination);
});

