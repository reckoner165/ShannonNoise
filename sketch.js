var tone; 
var fq = 1000;


function setup() {

createCanvas(600,600);
background(100);

// INITIAL SOUND

var env  = T("env", {table:[0, [2, 500], [0.1, 100]], loopNode:1}).bang();
tone  = T("osc", {freq:fq,mul:0.6}, env).play();

// tone = T("saw",{freq:1024}).play();
}


function draw() {


}


// INPUT BANK
function mousePressed(){

clipSound();
background(120,120,0);
}

function keyPressed() {
  if(keyCode === LEFT_ARROW){

    dropFreq();
  }

}

// FUNCTION BANK

function trill() {

  tone.set({freq:T("pulse", {freq:5, add:880, mul:20}).kr()});

tone.on("ended", function() {
  this.pause();});
}

function dropFreq() {

  tone.set({freq:tone.freq/2});

}

function clipSound() {

  tone.pause();
  var clip = T("clip", {minmax:0.3, mul:0.5}, tone).play();

}

