module.exports = function(uri){
	var sound = document.createElement('audio');
	sound.src = uri;

	return sound;
}

