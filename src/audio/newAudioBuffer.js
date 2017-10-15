module.exports = function(url){
	return new Promise((resolve, reject) => {
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

		const xhr = new XMLHttpRequest();

		xhr.open('GET', url, true);
		xhr.responseType = 'arraybuffer';

		xhr.onload = function(e) {
			var audioData = xhr.response;

			audioCtx.decodeAudioData(audioData, function(buffer) {
				resolve(buffer);
			}, function(e){
				reject(e);
			});
		};

		xhr.send();
	});
}

