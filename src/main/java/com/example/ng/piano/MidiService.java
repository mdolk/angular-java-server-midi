package com.example.ng.piano;

import javax.sound.midi.InvalidMidiDataException;
import javax.sound.midi.MidiUnavailableException;
import javax.sound.midi.ShortMessage;
import javax.sound.midi.Synthesizer;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.codehaus.jackson.annotate.JsonProperty;

@Path("/midi")
public class MidiService {
	private Synthesizer synth = Application.getSynth();	// Consider using a dependency injection framework!

	public static class JsonMidiMessage {
		@JsonProperty int command;
		@JsonProperty int channel;
		@JsonProperty int note;
		@JsonProperty int velocity;
	}

	@POST
	@Path("/send")
	@Consumes("application/json")
	@Produces("application/json")
	public JsonMidiMessage send(JsonMidiMessage json) throws InvalidMidiDataException, MidiUnavailableException {
		ShortMessage midi = new ShortMessage();
		midi.setMessage(json.command, json.channel, json.note, json.velocity);
		synth.getReceiver().send(midi, -1);
		return json;
	}
}
