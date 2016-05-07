//GLOBAL VARIABLES

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
	synth.volume.value = -12; //Volume in dB

}

//DEFINING RECEIVER

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

	if(keyFlag === 1) {

		if (key === 'q') {

			disrupt[0]();
		}
	}
	else if (keyFlag >= 5){

		keyFlag = 5;
	}
	

return false;
}

function keyReleased() {
	
	keyFlag = 0;
	delete noise;
	delete synth;
	source();
}

//FUNCTION ARRAY OF ALL DISRUPTION
var disrupt = [
    function() {

    	// var noise = new Tone.Tremolo(11, 0.75).toMaster().start();
    	var noise = new Tone.Distortion(0.8).toMaster();
    	synth = new Tone.SimpleSynth().connect(noise);
    	


     },
    function() { second_function('a string') },
    function() { third_function('a string') },
    function() { fourth_function('a string') }
]

Tone.Transport.start();
