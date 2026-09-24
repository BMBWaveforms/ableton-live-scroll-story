const C3 = 130.81;

export class GestureSynth {
  constructor() {
    this.context = null;
    this.voice = null;
    this.generation = 0;
  }

  async start({ pitch = 0, slide = 0.5, pressure = 0.25 } = {}) {
    this.stop();
    const generation = ++this.generation;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return false;
      this.context ||= new AudioContext();
      await this.context.resume();
      if (generation !== this.generation) return false;
      const now = this.context.currentTime;
      const fundamental = this.context.createOscillator();
      const warmth = this.context.createOscillator();
      const filter = this.context.createBiquadFilter();
      const gain = this.context.createGain();
      const warmthGain = this.context.createGain();
      fundamental.type = 'sawtooth';
      warmth.type = 'sine';
      filter.type = 'lowpass';
      filter.Q.value = 0.65;
      warmthGain.gain.value = 0.45;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.065, now + 0.22);
      fundamental.connect(filter);
      warmth.connect(warmthGain).connect(filter);
      filter.connect(gain).connect(this.context.destination);
      fundamental.start(now);
      warmth.start(now);
      this.voice = { fundamental, warmth, filter, gain };
      this.update({ pitch, slide, pressure });
      return true;
    } catch {
      this.voice = null;
      return false;
    }
  }

  update({ pitch = 0, slide = 0.5, pressure = 0.25 } = {}) {
    if (!this.voice || !this.context) return;
    const now = this.context.currentTime;
    const frequency = C3 * 2 ** (pitch / 12);
    this.voice.fundamental.frequency.setTargetAtTime(frequency, now, 0.025);
    this.voice.warmth.frequency.setTargetAtTime(frequency, now, 0.025);
    this.voice.filter.frequency.setTargetAtTime(340 + slide ** 1.6 * 3700, now, 0.035);
    this.voice.gain.gain.setTargetAtTime(0.045 + pressure * 0.18, now, 0.05);
  }

  stop() {
    this.generation += 1;
    if (!this.voice || !this.context) return;
    const { fundamental, warmth, gain } = this.voice;
    const now = this.context.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setTargetAtTime(0.0001, now, 0.14);
    fundamental.stop(now + 0.55);
    warmth.stop(now + 0.55);
    this.voice = null;
  }

  dispose() {
    this.stop();
    this.context?.close();
    this.context = null;
  }
}
