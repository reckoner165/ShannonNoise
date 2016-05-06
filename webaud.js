function setup() {

var ap = T("WebAudioAPI:recv");
var context = window.AudioContext;

var osc = context.createOscillator();
osc.frequency.value = 880;
osc.noteOn(1);

ap.recv(osc);

var synth = T("+sin", {freq:2, mul:0.5}, ap).play();

var send = T("WebAudioAPI:send", synth).send(context.destination);

timbre.once("reset", function() {
  send.cancel();
});
}

function draw() {


}