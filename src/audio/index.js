const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const newAudio = require("./newAudio");

const audio = newAudio("file:///home/nemanjan00/Music/Elvis Presley/Jailhouse Rock/01 Jailhouse Rock.mp3");
const source = audioCtx.createMediaElementSource(audio);

const gainNode = audioCtx.createGain();

source.connect(gainNode);
gainNode.gain.value = 3;

gainNode.connect(audioCtx.destination);

audio.play();

