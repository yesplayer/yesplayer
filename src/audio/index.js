const ft = require('fourier-transform/asm');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const newAudioBuffer = require("./newAudioBuffer");

const source = audioCtx.createBufferSource();

let cnt = 0;

newAudioBuffer("file:///home/nemanjan00/Music/Ed Sheeran/Shape of You/01 Shape of You (album version).mp3").then((buffer) => {
	window.buffer = buffer;

	source.buffer = buffer;

	const scriptNode = audioCtx.createScriptProcessor(256, 0, 2);

	let i = 0;
	let buffer1 = buffer;

	window.k = 1;

	scriptNode.onaudioprocess = function(audioProcessingEvent) {
		let outputBuffer = audioProcessingEvent.outputBuffer;

		let buffer = buffer1;

		let position = 0;

		let input = buffer.getChannelData(0);
		let out = outputBuffer.getChannelData(0);

		do {
			i += k * window.a;

			let j = Math.floor(i);
			let diff = i - j;

			out[position] = input[j] * diff + input[j + 1] * (1 - diff);
			position++;
		} while(position < out.length);


		if(cnt++ % 8 == 0){
			window.spectrum = ft(out);
		}
	}

	scriptNode.connect(audioCtx.destination);
});

