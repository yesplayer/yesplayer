module.exports = function(audioCtx, buffer, outputNode){
	let i = 0;
	let cnt = 0;

	let speed = {
		speed: 1,
		playing: 1,
		buffer: undefined,
		transformationFunction: function(audioProcessingEvent) {
			let outputBuffer = audioProcessingEvent.outputBuffer;

			let buffer = speed.buffer;

			let oldI = i;

			let end = false;

			for(chan = 0; chan < 2; chan++){
				i = oldI;
				let position = 0;

				let input = buffer.getChannelData(chan);
				let out = outputBuffer.getChannelData(chan);

				do {
					i += speed.speed * speed.playing;

					if(i < 0 || i >= input.length){
						end = true;
						speed.playing = false;
					}

					if(!end){
						let floor = Math.floor(i);
						let diff = i - floor;

						out[position] = input[floor] * diff + input[floor + 1] * (1 - diff);
					} else {
						out[position] = 0;
					}
					
					position++;
				} while(position < out.length);
			}
		},
		init: function(audioCtx, buffer, outputNode){
			const scriptNode = audioCtx.createScriptProcessor(256, 0, 2);

			speed.buffer = buffer;

			scriptNode.onaudioprocess = speed.transformationFunction;

			scriptNode.connect(outputNode);

			return speed;
		}
	}


	return speed.init(audioCtx, buffer, outputNode);
}
