const newAudioBuffer = require("./newAudioBuffer");
const speed = require("./speed");

let audio = {
	inited: false,
	
	gainNode: undefined,
	audioCtx: undefined,

	tracks: [],

	init: function(){
		audio.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		audio.gainNode = audio.audioCtx.createGain();

		audio.gainNode.connect(audio.audioCtx.destination);

		audio.gainNode.gain.value = 1;
	},
	addTrack: function(url){
		return new Promise(function(resolve, reject){
			newAudioBuffer(url).then((buffer) => {
				const speedInstance = speed(audio.audioCtx, buffer, audio.gainNode);

				audio.tracks.push(speedInstance);

				//resolve(speedInstance);

				const analyser = audio.audioCtx.createAnalyser();

				audio.gainNode.connect(analyser);

				analyser.fftSize = 256;

				var dataArray = new Uint8Array(analyser.frequencyBinCount); // Uint8Array should be the same length as the frequencyBinCount 
				window.spectrum = dataArray;

				setInterval(function(){
					analyser.getByteFrequencyData(dataArray);
				});
			}).catch(function(error) {
				reject(error);
			});
		})
	}
}

module.exports = function(){
	if(!audio.inited){
		audio.init();
	}

	return audio;
}

