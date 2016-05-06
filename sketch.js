var tone; 
var tone2;
var env;
var fq;
var fqInit = 1000;
var envVal1 = 500;
var envVal2 = 100;
var gain; var vol1 = 10;


function setup() {

// var blah = createCanvas(200,80);
// blah.parent('blah');
// // console.log(source);
// background(100);

// receiver = createCanvas(200,200);
// receiver.parent('RECEIVER');
// background(100);

// INITIAL SOUND

env  = T("env", {table:[0, [2, envVal1], [0.1, envVal2]], loopNode:1}).bang();
tone  = T("osc", {freq:fqInit,mul:0.4}, env).play();
tone1 = T("osc", {freq:1000,mul:0.4}, env);
tone2 = T("pluck", {freq:fqInit/2||fq.value/2, mul:0.5});

// INPUT AND OUTPUT SCOPE

T("scope", {interval:10}).on("data", function() {
  this.plot({target:source});
}).listen(tone1);

T("scope", {interval:10}).on("data", function() {
  this.plot({target:receiver});
}).listen(tone);
// console.log(tone);

// tone = T("saw",{freq:1024}).play();
}


function draw() {

// var vol1 = map(mouseX,0,width,0,1); 
// gain = new p5.Gain();
// gain.setInput(tone);
// gain.amp(vol1,0.5,0);



}


// INPUT BANK
function mousePressed(){

clipSound();
// background(120,120,0);
}

function keyTyped() {
	console.log(env);
  if(key === 'q'){

    dropFreq();
  }
  else if(key === 'w') {

  	raiseFreq();
  }
  else if(key === 'e') {

  	trill();
  }
  else if(key === 'r'){

  	reLoad();
  }
  else if(key === 't'){

  	pluckTone();
  }
  else if(key === 'y'){

  	delayPluck();
  }
  else if(key === 'u'){

    vol1 = vol1 + 10;
  }
  else if(key === 'i'){

  }
  else if(key === 'o'){

    var api = T("WebAudioAPI:recv");
    var context = api.context;

    var osc = context.createOscillator();
    osc.frequency.value = 880;
    osc.noteOn(0);

    api.recv(osc);

    T("+sin", {freq:2},api).play();

  }
  else if(key === 'p'){
  	
  }
  else if(key === '['){
  	
  }
  else if(key === ']'){
  	
  }
  else if(key === 'a'){
  	
  }
  else if(key === 's'){
  	
  }
  else if(key === 'd'){
  	
  }
  else if(key === 'f'){
  	
  }
  else if(key === 'g'){
  	
  }

  T("scope", {interval:10}).on("data", function() {
  this.plot({target:receiver});
}).listen(tone);

}

function keyReleased() {

tone.pause();
tone  = T("osc", {freq:fqInit,mul:0.4}, env).play();  
}

// FUNCTION BANK

function trill() {

  tone.set({freq:T("pulse", {freq:fq.value/20||fqInit/20, add:fq.value*1.5||fq*1.5, mul:40}).kr()});

  tone.on("ended", function() {
  	this.pause();
  });
}

function dropFreq() {

  tone.set({freq:tone.freq/2});
  tone2.set({freq:tone2.freq/1.2});
  fq = tone.freq;
}

function raiseFreq() {

  tone.set({freq:tone.freq*2});
  tone2.set({freq:tone2.freq*1.2});
  fq = tone.freq;
  // console.log(fq.value);
}

function clipSound() {

  tone.pause();
  var clip = T("clip", {minmax:0.3, mul:0.5}, tone).play();
}

function reLoad() {

	location.reload();
}

function pluckTone() {

	// tone2.set({freq:tone.freq});
	tone2.bang().play();
}

function delayPluck() {

	var t = T("+sin", {freq:0.3, add:150, mul:25});
	T("delay", {time:t, fb:0.9, mix:0.45}, tone2).play();
}

// function envCrazy1() {

// 	tone.pause();
// 	env.set({table[1][2] = env.table[1][2]/5});
// 	tone.play();

// }

