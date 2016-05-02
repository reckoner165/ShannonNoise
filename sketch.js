var tone; 
var env;
var fq = 1000;
var envVal1 = 500;
var envVal2 = 100;

function setup() {

// createCanvas(600,600);
// background(100);

// INITIAL SOUND

env  = T("env", {table:[0, [2, envVal1], [0.1, envVal2]], loopNode:1}).bang();
tone  = T("osc", {freq:fq,mul:0.6}, env).play();

// tone = T("saw",{freq:1024}).play();
}


function draw() {


}


// INPUT BANK
function mousePressed(){

clipSound();
// background(120,120,0);
}

function keyTyped() {
  if(key === 'a'){

    dropFreq();
  }
  else if(key === 'b') {

  	raiseFreq();
  }
  else if(key === 'c') {

  	trill();
  }
  else if(key == 'r'){

  	reLoad();
  }

}

// FUNCTION BANK

function trill() {

  tone.set({freq:T("pulse", {freq:fq/20, add:fq*1.5, mul:40}).kr()});

  tone.on("ended", function() {
  	this.pause();
  });
}

function dropFreq() {

  tone.set({freq:tone.freq/2});
  fq = tone.freq;
}

function raiseFreq() {

  tone.set({freq:tone.freq*2});
  fq = tone.freq;
  console.log(fq);
}

function clipSound() {

  tone.pause();
  var clip = T("clip", {minmax:0.3, mul:0.5}, tone).play();
}

function reLoad() {

	location.reload();
}

// function envCrazy1() {

// 	tone.pause();
// 	env.set({table[1][2] = env.table[1][2]/5});
// 	tone.play();

// }

