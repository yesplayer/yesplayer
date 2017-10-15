const ft = require('fourier-transform/asm');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const newAudioBuffer = require("./newAudioBuffer");

const source = audioCtx.createBufferSource();

let cnt = 0;

newAudioBuffer("file:///home/nemanjan00/Music/Caravan Palace/00 Black Betty.mp3").then((buffer) => {
	window.buffer = buffer;

	source.buffer = buffer;

	const scriptNode = audioCtx.createScriptProcessor(256, 0, 2);

	let i = 0;
	let buffer1 = buffer;

	window.k = 1;

	scriptNode.onaudioprocess = function(audioProcessingEvent) {
		let outputBuffer = audioProcessingEvent.outputBuffer;

		let buffer = buffer1;

		let oldI = i;

		for(chan = 0; chan < 2; chan++){
			i = oldI;
			let position = 0;

			let input = buffer.getChannelData(chan);
			let out = outputBuffer.getChannelData(chan);

			do {
				i += k * window.a;

				let j = Math.floor(i);
				let diff = i - j;

				out[position] = input[j] * diff + input[j + 1] * (1 - diff);
				position++;
			} while(position < out.length);
		}

		if(cnt++ % 8 == 0){
			let out = outputBuffer.getChannelData(1);
			window.spectrum = ft(out);
		}

		gainNode.gain.value = window.gain;
	}

	const gainNode = audioCtx.createGain();

	gainNode.gain.value = 1;

	scriptNode.connect(gainNode);
	gainNode.connect(audioCtx.destination);
});

