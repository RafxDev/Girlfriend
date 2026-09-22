// Web Audio API sound synthesis - 100% standalone, no external assets needed!

class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgMusicPlaying = false;
    this.musicTimer = null;
    this.musicGain = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.musicGain) {
      this.musicGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.15, this.ctx?.currentTime || 0, 0.1);
    }
    return this.isMuted;
  }

  // Realistic charming duck quack 🦆
  playDuckQuack() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      
      // Quack pitch drop (typical duck formants)
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.18);

      // Formant-like bandpass filter for duck nasal tone
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);
      filter.Q.setValueAtTime(4, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);

      // Add slight second harmonic for realism
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(840, now);
      osc2.frequency.exponentialRampToValueAtTime(480, now + 0.18);
      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc2.connect(filter);
      osc2.start(now);
      osc2.stop(now + 0.2);
    } catch (e) {
      console.warn("Audio unavailable", e);
    }
  }

  // Crispy cookie snap sound 🍪
  playCookieCrunch() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // White noise burst for crispness
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1400, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
    } catch (e) {
      console.warn("Audio crunch error", e);
    }
  }

  // Juicy citrus pop for mandarins 🍊
  playCitrusPluck() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (e) {
      console.warn("Citrus sound error", e);
    }
  }

  // Gentle flower bloom chime 🌻
  playFlowerChime(index = 0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51]; // C major pentatonic
      const freq = notes[index % notes.length];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.0);
    } catch (e) {
      console.warn("Flower chime error", e);
    }
  }

  // Background acoustic ambient music (Over the Garden Wall theme inspired) 🍂
  toggleBackgroundMusic() {
    this.initContext();
    if (this.bgMusicPlaying) {
      this.stopBackgroundMusic();
      return false;
    } else {
      this.startBackgroundMusic();
      return true;
    }
  }

  startBackgroundMusic() {
    if (!this.ctx) this.initContext();
    if (!this.ctx) return;
    this.bgMusicPlaying = true;

    if (!this.musicGain) {
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : 0.12, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);
    }

    // Melancholy / cozy waltz-like progression: Dm, G, C, Am, E7, Am
    const chords = [
      [293.66, 349.23, 440.00], // Dm (D, F, A)
      [246.94, 293.66, 392.00], // G (B, D, G)
      [261.63, 329.63, 392.00], // C (C, E, G)
      [220.00, 261.63, 329.63], // Am (A, C, E)
      [246.94, 329.63, 415.30], // E7 (B, E, G#)
      [220.00, 261.63, 329.63], // Am
    ];

    let chordIdx = 0;

    const playChordStep = () => {
      if (!this.bgMusicPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentChord = chords[chordIdx % chords.length];

      // Arpeggiate notes softly
      currentChord.forEach((noteFreq, i) => {
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(noteFreq, now + i * 0.4);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750, now);

        const startTime = now + i * 0.4;
        noteGain.gain.setValueAtTime(0.001, startTime);
        noteGain.gain.linearRampToValueAtTime(0.1, startTime + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.musicGain);

        osc.start(startTime);
        osc.stop(startTime + 2.0);
      });

      chordIdx++;
      this.musicTimer = setTimeout(playChordStep, 2400);
    };

    playChordStep();
  }

  stopBackgroundMusic() {
    this.bgMusicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const soundFx = new SoundController();
