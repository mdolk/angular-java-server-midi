describe('PianoCtrl', function() {
  var scope, ctrl, $httpBackend;

	beforeEach(function(){
		this.addMatchers({
			toBeGreaterThanOrEqualTo: function(expected) { return this.actual >= expected; }
		});
    inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();
      controller = $controller(PianoCtrl, {$scope: scope});
    });
	});

	it('should measure latency on each send', function() {
    var data = {command:144, channel:0, note:77, velocity:60};
	  $httpBackend.expectPOST('data/midi/send', data).respond(data);
		scope.latency = -1;
		scope.sendMidiCommand(scope.NOTE_ON, 77);
		$httpBackend.flush();
		expect(scope.latency).toBeGreaterThanOrEqualTo(0);
	});
})