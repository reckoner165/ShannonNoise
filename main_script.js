//INITIALIZING GLOBAL VARIABLES

//The Message
var notes = ["A3", "E4", "E5", "A4", "D5", "A4", "E5", "A4", "C5", "A4", "E5", "A4", "B4", "A4", "E4", "A4"];

var position = 0;
var synth; 
var keyFlag = 0; 
var keyTimer = 0;
var note = "A3";

var sourceCol;
var recCol;
var noiseCol;


// DEFINING SOURCE - Synthesizer Object
function source() {

// Tone object constructs a synth with its output directed to the Master i.e., Speakers
	synth = new Tone.MonoSynth({
	"oscillator" : {
		"type" : "sine"
	 },
	 "envelope" : {
	 	"attack" : 0.9
	 },


	}).toMaster();
	synth.volume.value = -10; //Volume in dB

}

//DEFINING TRANSMITTER - Takes in one note at a time from the notes array 

function setup(){


	source();
	// NOTE SEQUENCING	
	duration = 0.2;

	var can = createCanvas(700,400);
	can.parent('RECEIVER');
	background(0);
	//INTERACTIVE FEEDBACK SYSTEM
	// Tone object looks for disruption and sends new notes ONLY if there has been no disruption
	// for 16 notes in a stretch

	Tone.Transport.setInterval(function(time){
		
		keyTimer += 1;
		if(keyTimer > 16){
			// background(randIn(180,240),randIn(180,240),randIn(180,240));
			note = notes[position++];	
			position = position % notes.length;
		}
		    
	    // console.log(position); //DEBUG
		    
	    synth.triggerAttackRelease(note, 0.25, time); 
	}, duration);

}


// VISUAL FEEDBACK - MINIMALIST REPRESENTATION OF SHANNON'S MODEL
function draw(){
stroke(255);
line(220,150,480,150);

sourceCol = color(random(255),random(255),random(255));
recCol = sourceCol;
// Dynamic visibility of the Noise module upon key press
if (keyFlag >= 1){

	stroke(255,0,0);
	fill(random(255));
	
	var t2 = triangle(600, 100, 480, 150, 600, 200);
	
	fill(noiseCol);
	var t3 = triangle(300, 300, 400, 300, 350, 200);
	
	line(350,150,480,150);
	line(350,200,350,150);
}
else{
	stroke(0);
	fill(0,0,0);
	var t3 = triangle(300, 300, 400, 300, 350, 200);
	fill(recCol);
	var t2 = triangle(600, 100, 480, 150, 600, 200);
	
	line(350,200,350,150);
}

fill(sourceCol);
noStroke();
var t1 = triangle(100, 100, 220, 150, 100, 200);


}

Tone.Transport.start(); //Synthesizer object transmits notes

//NOISING BY USER - KEYBOARD EVENTS
function keyTyped() {

	reCol = random(255);
	noiseCol = color(255,0,0);
	keyFlag+=1;
	keyTimer = 0;
	// console.log(synth.portamento);

	if(key === ' '){

			location.reload();
			// console.log("sup");
		}

	else{

		

		if(keyFlag === 1 || keyFlag === 2) {

			disrupt[Math.floor(Math.random() * 9)]();
			// disrupt[6]();

		}
		else if (keyFlag >= 100){

			keyFlag = 100;
		
		}
	}	

return false;
}

function keyReleased() {
	
	bw = color(random(255));
	noiseCol = color(0,0,0);
	keyFlag = 0;
	delete noise;
	delete synth;
	// delete t3;
	noiseCol = color(0,0,0);
	source();


	return false;
}

//FUNCTION ARRAY OF ALL DISRUPTION
var disrupt = [
    function() { //FUNCTION 0 - A clip distortion

    	
    	var noise = new Tone.Distortion(0.8).toMaster();
    	synth = new Tone.SimpleSynth().connect(noise);
    },
    function() { //FUNCTION 1 - Bit-quantizer that crushes to 2 bits

    	var noise = new Tone.BitCrusher(2).toMaster();
		synth = new Tone.MonoSynth().connect(noise);
    },
    function() { //FUNCTION 2 - Fixed delay

    	var noise = new Tone.FeedbackDelay("3n", 0.8).toMaster();
    	synth = new Tone.SimpleSynth().connect(noise);
    	// console.log('works'); // DEBUG
    },
    function() { //FUNCTION 3 - Fixed tremolo

    	var noise = new Tone.Tremolo(11, 0.85).toMaster().start();
    	synth = new Tone.MonoSynth().connect(noise);
    },
    function() { //FUNCTION 4 - Stereo split with low pass filter with its cutoff freq. controlled by an LFO

    	var cutoff
    	var noise = new Tone.Filter().toMaster();
    	var lfo = new Tone.LFO("4n", 100, 5000).start();
    	lfo.connect(noise.frequency);
    	synth = new Tone.SimpleSynth().connect(noise);
    },
    function() { //FUNCTION 5 - Comb Filter

    	var noise = new Tone.FeedbackCombFilter().toMaster();
    	synth = new Tone.SimpleSynth().connect(noise);
    },
    function() { //FUNCTION 6 - Variable cutoff filter with rapidly varying oscillator adding harmonics

    	var split = new Tone.Split();
    	var noise = new Tone.Filter().toMaster();
		synth = new Tone.SimpleSynth().connect(split);
		var lfo = new Tone.LFO("128n", 100, 5000).start();
    	lfo.connect(noise.frequency);
		split.right.connect(noise);
		split.left.toMaster();
    },
    function() { //FUNCTION 7 - Adds noise to right channel

    	var merge = new Tone.Merge().toMaster();
    	var synth = new Tone.SimpleSynth().connect(merge.left);
    	var noise = new Tone.LFO("320n", -0.2, 0.2).start();
    	noise.connect(merge.right);
    	
    },
    function() { //FUNCTION 8 - High feedback delay

    	var noise = new Tone.PingPongDelay({
			"delayTime" : "16n",
			"feedback" : 0.999999,
			"wet" : 0.5
		}).toMaster();

    	synth = new Tone.SimpleSynth().connect(noise);
    },
    function() { //FUNCTION 9 - Variable frequency (low frequency FM)
    	synth = new Tone.SimpleSynth().toMaster();
    	var lfo = new Tone.LFO("16n", -100, 100).start();
    	lfo.connect(synth.detune);
    },
    function() { //FUNCTION 10 - Variable delay

    	var noise = new Tone.PingPongDelay({
			"delayTime" : 300,
			"feedback" : 0.9,
			"wet" : 0.5
		}).toMaster();
		var lfo = new Tone.LFO("8n", -80, 80).start();
    	lfo.connect(noise.delayTime);
    	synth = new Tone.SimpleSynth().connect(noise);

    }
]

// Function to create random values
function randIn(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


