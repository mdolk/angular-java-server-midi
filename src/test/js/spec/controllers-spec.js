describe('PianoCtrl', function() {
	var scope, controller;

	beforeEach(function(){
		this.addMatchers({
			toBeGreaterThanOrEqualTo: function(expected) { return this.actual >= expected; }
		});
		scope = angular.scope();		
		controller = scope.$new(PianoCtrl);
	});

	it('should measure latency on each send', function() {
		var xhr = scope.$service('$browser').xhr;
		var data = {channel:0, command:144, note:77, velocity:60};
		xhr.expectPOST('/data/midi/send', data).respond(data);
		controller.latency = -1;
		controller.sendMidiCommand(controller.NOTE_ON, 77);
		xhr.flush();
		expect(controller.latency).toBeGreaterThanOrEqualTo(0);
	});
})