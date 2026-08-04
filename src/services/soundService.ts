// ============================================================
// Sound Service — Web Audio API Synthesizer for Human Benchmark
// Ultra-low latency, zero external assets, 100% offline & mobile-ready.
// ============================================================

class SoundService {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    // Read persisted mute preference from localStorage
    try {
      const stored = localStorage.getItem('hb_sound_muted');
      if (stored !== null) {
        this.muted = stored === 'true';
      }
    } catch {
      this.muted = false;
    }
  }

  /**
   * Lazily initialize or resume AudioContext on first user interaction
   */
  private getContext(): AudioContext | null {
    if (this.muted) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean): void {
    this.muted = muted;
    try {
      localStorage.setItem('hb_sound_muted', String(muted));
    } catch {
      // ignore
    }
    this.listeners.forEach((fn) => fn(muted));
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // ------------------------------------------------------------
  // CORE SYNTHESIS HELPERS
  // ------------------------------------------------------------

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    gainVal: number = 0.2,
    pitchEnd?: number
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      if (pitchEnd !== undefined) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, pitchEnd), ctx.currentTime + duration);
      }

      // Quick attack & smooth exponential decay
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration + 0.05);
    } catch {
      // AudioContext failure fallback
    }
  }

  private playChord(notes: number[], duration: number, type: OscillatorType = 'triangle', gainVal: number = 0.15) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, duration, type, gainVal);
        }, idx * 40);
      });
    } catch {
      // fallback
    }
  }

  // ------------------------------------------------------------
  // GAME-SPECIFIC AUDIO STIMULI
  // ------------------------------------------------------------

  /**
   * 1. Reaction Time: Crisp instantaneous audio stimulus when red turns green
   */
  public playReactionGreen(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // Dual-frequency punchy stimulus (880Hz + 1760Hz harmonic) for immediate auditory reaction cue
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1760, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.13);
      osc2.stop(now + 0.13);
    } catch {
      this.playTone(880, 0.1, 'sine', 0.25);
    }
  }

  /**
   * Reaction Time: Too early / false start buzzer
   */
  public playReactionEarly(): void {
    this.playTone(160, 0.2, 'sawtooth', 0.25, 90);
  }

  /**
   * Reaction Time: Single attempt finished
   */
  public playReactionResult(): void {
    this.playTone(587.33, 0.08, 'sine', 0.15); // D5
  }

  /**
   * 2. Sequence Memory: Musical note when tile illuminates / user clicks
   * 9 distinct pentatonic notes (C4, D4, E4, G4, A4, C5, D5, E5, G5)
   */
  public playSequenceNote(index: number): void {
    const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99];
    const freq = scale[Math.abs(index) % scale.length];
    this.playTone(freq, 0.22, 'sine', 0.25);
  }

  /**
   * Sequence Memory: Wrong box clicked
   */
  public playSequenceWrong(): void {
    this.playTone(180, 0.35, 'sawtooth', 0.25, 80);
  }

  /**
   * 3. Aim Trainer: Crisp laser pop / hit sound on every target touch
   */
  public playAimHit(hitNumber: number = 1): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // Dynamic pitch: slightly climbs with streak for maximum satisfaction
      const baseFreq = 700 + Math.min(600, hitNumber * 15);
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      this.playTone(950, 0.05, 'sine', 0.2);
    }
  }

  /**
   * 4. Number Memory: Soft tick / reveal sound, success, and error
   */
  public playNumberTick(): void {
    this.playTone(600, 0.03, 'sine', 0.06);
  }

  public playNumberSuccess(): void {
    this.playChord([523.25, 659.25, 783.99], 0.2, 'sine', 0.18); // C Major
  }

  public playNumberWrong(): void {
    this.playTone(220, 0.28, 'sawtooth', 0.2, 140);
  }

  /**
   * 5. Verbal Memory: Heart / Life lost warning sound
   */
  public playLifeLost(livesRemaining: number = 0): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch drop with alarm feel
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.28, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);

      // Extra sub-thud for dramatic impact if game over (0 lives)
      if (livesRemaining === 0) {
        setTimeout(() => {
          this.playTone(90, 0.4, 'triangle', 0.3, 40);
        }, 120);
      }
    } catch {
      this.playTone(200, 0.25, 'sawtooth', 0.25, 100);
    }
  }

  /**
   * 6. Chimp Test: Ascending glass tone per correct number tap & wrong buzzer
   */
  public playChimpCorrect(step: number): void {
    const base = 440; // A4
    const freq = base * Math.pow(2, ((step - 1) * 2) / 12);
    this.playTone(freq, 0.12, 'sine', 0.22);
  }

  public playChimpWrong(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // Double strike buzz
      this.playTone(180, 0.08, 'sawtooth', 0.22);
      setTimeout(() => {
        this.playTone(140, 0.14, 'sawtooth', 0.25);
      }, 100);
    } catch {
      this.playTone(150, 0.2, 'sawtooth', 0.2);
    }
  }

  /**
   * 7. Visual Memory: Tile flip pop / correct tile, wrong tile, level complete
   */
  public playTileCorrect(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      this.playTone(700, 0.08, 'sine', 0.2);
    }
  }

  public playTileWrong(): void {
    this.playTone(160, 0.25, 'sawtooth', 0.25, 90);
  }

  /**
   * 8. General Level Up / Success Arpeggio
   */
  public playLevelUp(): void {
    this.playChord([523.25, 659.25, 783.99, 1046.5], 0.22, 'triangle', 0.18); // C5, E5, G5, C6
  }

  /**
   * 9. Typing / Mobile Typing: Subtle tactile mechanical key click & countdown
   */
  public playKeyClick(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      // Ultra-short 12ms bandpassed noise impulse for realistic tactile click
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.015);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.001);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // ignore
    }
  }

  public playTypo(): void {
    this.playTone(220, 0.04, 'triangle', 0.12);
  }

  public playCountdownTick(isFinal: boolean = false): void {
    if (isFinal) {
      this.playTone(880, 0.2, 'sine', 0.25); // GO!
    } else {
      this.playTone(440, 0.1, 'sine', 0.18); // 3, 2, 1
    }
  }

  /**
   * 10. Final Game Completion Fanfare
   */
  public playVictory(): void {
    this.playChord([440, 554.37, 659.25, 880], 0.35, 'triangle', 0.2); // A Major
  }
}

export const soundService = new SoundService();
export default soundService;
