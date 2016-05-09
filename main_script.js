//GLOBAL VARIABLES

//The Message
var notes = ["A3", "E4", "E5", "A4", "D5", "A4", "E5", "A4", "C5", "A4", "E5", "A4", "B4", "A4", "E4", "A4"];
var position = 0;
var synth; 
var keyFlag = 0; 
var keyTimer = 0;
var note = "A3";


// DEFINING SOURCE
function source() {

// Tone object constructs a synth with its output directed to the Master i.e., Speakers
	synth = new Tone.MonoSynth({
	"oscillator" : {
		"type" : "sawtooth"
	 },
	 "envelope" : {
	 	"attack" : 0.5
	 },
	 // "filterEnvelope" : {
	 // "attack" : 0.6 
	 // }

	}).toMaster();
	synth.volume.value = -18; //Volume in dB

}

//DEFINING ENCODER

function setup(){


	source();
	// NOTE SEQUENCING	
	duration = 0.2;

	//INTERACTIVE FEEDBACK SYSTEM
	// Tone object looks for disruption and sends new notes ONLY if there has been no disruption
	// for 32 notes in a stretch

	Tone.Transport.setInterval(function(time){
		
		keyTimer += 1;
		if(keyTimer > 32){
			note = notes[position++];	
			position = position % notes.length;
		}

	 
		    
	    // console.log(position); //DEBUG
		    
	    synth.triggerAttackRelease(note, 0.25, time); 
	}, duration);

}



function draw(){


}



//NOISING BY USER - KEYBOARD EVENTS
function keyTyped() {
	keyFlag+=1;
	keyTimer = 0;

	if(key === ' '){

			location.reload();
			console.log("sup");
		}

	else{

		

		if(keyFlag === 1 || keyFlag === 2) {

			disrupt[Math.floor(Math.random() * 6)]();
			// if (key === 'q') {

			// 	disrupt[4]();
			// }
			// else if (key === 'w'){

			// 	disrupt[6]();
			// 	// console.log(synth);
			// }
		}
		else if (keyFlag >= 100){

			keyFlag = 100;
		
		}
	}	

// return false;
}

function keyReleased() {
	
	keyFlag = 0;
	delete noise;
	delete synth;
	source();
}

//FUNCTION ARRAY OF ALL DISRUPTION
var disrupt = [
    function() { //FUNCTION 0

    	// var noise = new Tone.Tremolo(11, 0.75).toMaster().start();
    	var noise = new Tone.Distortion(0.8).toMaster();
    	synth = new Tone.SimpleSynth().connect(noise);
    },
    function() { //FUNCTION 1

    	var noise = new Tone.BitCrusher(2).toMaster();
		synth = new Tone.MonoSynth().connect(noise);
    },
    function() { //FUNCTION 2

    	var noise = new Tone.FeedbackDelay("3n", 0.8).toMaster();
    	synth = new Tone.SimpleSynth().connect(noise);
    },
    function() { //FUNCTION 3

    	var noise = new Tone.Tremolo(11, 0.85).toMaster().start();
    	synth = new Tone.MonoSynth().connect(noise);
    },
    function() { //FUNCTION 4

    	var cutoff
    	var noise = new Tone.Filter().toMaster();
    	var lfo = new Tone.LFO("1n", 4000, 1000).connect(noise.frequency);
    	synth = new Tone.SimpleSynth().connect(noise);
    },
    function() { //FUNCTION 5

    	var noise = new Tone.FeedbackCombFilter().toMaster();
    	synth = new Tone.SimpleSynth().connect(noise);
    },
    function() { //FUNCTION 6

    	var split = new Tone.Split();
    	var noise = new Tone.Filter().toMaster();
		synth = new Tone.SimpleSynth().connect(split);
		split.right.connect(noise);
		split.left.toMaster();
    }
]

Tone.Transport.start();
