package com.example.ng.piano;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.sound.midi.MidiSystem;
import javax.sound.midi.MidiUnavailableException;
import javax.sound.midi.Synthesizer;

public class Application implements ServletContextListener {

	private static Synthesizer synth;

	public static Synthesizer getSynth() {
		return synth;
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		try {
			Logger.getLogger(Application.class.getName()).log(Level.INFO, "Preparing the synthesizer for funky music.");
			synth = MidiSystem.getSynthesizer();
			synth.open();
		} catch (MidiUnavailableException ex) {
			Logger.getLogger(Application.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		synth.close();
		Logger.getLogger(Application.class.getName()).log(Level.INFO, "Elvis has left the building.");
	}

}
