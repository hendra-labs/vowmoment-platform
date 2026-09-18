// Gentle romantic harp / piano arpeggio synthesizer using Web Audio API

class RomanticAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private noteIndex: number = 0;

  // Gentle pentatonic romantic chords (C major 9 / F maj 7 arpeggio)
  private notes: number[] = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    493.88, // B4
    523.25, // C5
    392.00, // G4
    329.63, // E4
    349.23, // F4
    440.00, // A4
    523.25, // C5
    659.25, // E5
    440.00, // A4
  ];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start(): void {
    if (this.isPlaying) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioContextClass();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;
      this.noteIndex = 0;

      this.intervalId = setInterval(() => {
        this.playPluckNote(this.notes[this.noteIndex]);
        this.noteIndex = (this.noteIndex + 1) % this.notes.length;
      }, 500);
    } catch (e) {
      console.warn('AudioContext not supported or permitted yet', e);
    }
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private playPluckNote(frequency: number): void {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      // Delicate soft envelope (soft attack, lingering chime release)
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.85);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.9);
    } catch (e) {
      // ignore
    }
  }
}

export const romanticAudio = new RomanticAudioPlayer();
