function PianoCtrl($xhr) {
	$xhr.defaults.headers.post['Content-Type'] = 'application/json';
	var scope = this;

	var genKeyboard = function(startOctave, endOctave) {
		if (startOctave < 0 || endOctave > 8 || startOctave >= endOctave) throw "Bad arguments";
		var notes = [
			['C',  0,   'white'], ['Db', 0.5, 'black'],	['D',  1,   'white'], ['Eb', 1.5, 'black'],
			['E',  2,   'white'], ['F',  3,   'white'],	['Gb', 3.5, 'black'], ['G',  4,   'white'],
			['Ab', 4.5, 'black'], ['A',  5,   'white'],	['Bb', 5.5, 'black'], ['B',  6,   'white'],
		];
		var fullOctaves = endOctave - startOctave - 1;
		var totalWhites = 2 + fullOctaves*7 + 1; // (A..B) + n*(C..B) + C
		var genOctave = function(oct, start, end) {
			var keys = [];
			for (var i=start; i<end; i++) {
				keys.push({
					name : notes[i][0] + oct,					
					color : notes[i][2],
					midiNote : oct*12 + i + 12,
					cssPosition : {
						left: (100 * (notes[i][1] - 5 + (oct-startOctave)*7) / totalWhites)+'%', //5:A first, 7:whites/octave
						width: (100/totalWhites)+'%'
					}
				});
			}
			return keys;
		}
		var keys = genOctave(startOctave, 9, 12);			// A, Bb, B
		for (var oct=startOctave+1; oct < endOctave; oct++) {
			keys = keys.concat( genOctave(oct, 0, 12) );	// Full octave
		}
		return keys.concat( genOctave(endOctave, 0, 1) );	// C
	}

	scope.NOTE_ON = 144;
	scope.NOTE_OFF = 128;
	scope.sendMidiCommand = function(command, midiNote) {
		var midiMessage = {
			command: command,
			channel: scope.channel,
			note: midiNote,
			velocity: scope.velocity
		}
		var timeStart = new Date().getTime();
		$xhr('POST', '/data/midi/send', midiMessage, function(code, response) {
			scope.latency = new Date().getTime() - timeStart;
		});
	}

	scope.startOctave = 2;
	scope.endOctave = 6;
	scope.resetKeyboard = function() {
		scope.keyboard = genKeyboard(scope.startOctave, scope.endOctave);
	}
	scope.resetKeyboard();
	
	scope.latency = 0;
	scope.showNames = true;
	scope.channel = 0;
	scope.velocity = 60;
}
PianoCtrl.$inject = ['$xhr'];