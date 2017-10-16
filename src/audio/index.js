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

				resolve(speedInstance);
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

