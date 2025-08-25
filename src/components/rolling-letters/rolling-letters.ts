import {
  Component,
  Input,
  SimpleChanges,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rolling-letters',
  imports: [CommonModule],
  templateUrl: './rolling-letters.html',
  styleUrl: './rolling-letters.css',
})
export class RollingLetters {
  /** Final words to land on, one string per row */
  @Input() words: string[] = ['HELLO', 'THERE'];

  /** If false → keep spinning; when true → reveal target words */
  @Input() isReady = false;

  /** How fast letters cycle (lower = faster flicker) */
  @Input() tickMs = 90;

  /** Visual column stagger for the bounce animation only */
  @Input() staggerMs = 180;

  /** Force uppercase rendering (input words will be normalized) */
  @Input() uppercase = true;

  // --- internals ---
  private alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  private alphabetLower = 'abcdefghijklmnopqrstuvwxyz'.split('');
  private timers: number[][] = []; // per row/col intervals

  // signals
  private _words = signal<string[]>([]);
  rows = computed(() => this._words());
  reducedMotion = signal<boolean>(false);

  state = signal<string[][]>([]); // what’s currently shown
  targets = signal<string[][]>([]); // final letters for each row/col
  spinningMap = signal<boolean[][]>([]); // which cells are spinning

  ngOnInit() {
    this.reducedMotion.set(
      matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    );
    this.setupFromWords(this.words);

    if (this.isReady) {
      this.reveal();
    } else {
      this.spinIndefinitely();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Words changed → re-normalize and either spin or reveal depending on readiness
    if ('words' in changes && !changes['words'].firstChange) {
      this.setupFromWords(this.words);
      if (this.isReady) {
        this.reveal();
      } else {
        this.spinIndefinitely();
      }
    }

    // Readiness changed → either reveal now or start spinning
    if ('isReady' in changes && !changes['isReady'].firstChange) {
      if (this.isReady) {
        this.reveal();
      } else {
        this.spinIndefinitely();
      }
    }

    // Uppercase toggle at runtime
    if ('uppercase' in changes && !changes['uppercase'].firstChange) {
      this.setupFromWords(this.words);
      if (this.isReady) {
        this.reveal();
      } else {
        this.spinIndefinitely();
      }
    }
  }

  ngOnDestroy() {
    this.clearAll();
  }

  // --- rendering helpers ---

  maxLenArray(): number[] {
    const maxLen = Math.max(...this.rows().map((r) => r.length));
    return Array.from({ length: maxLen }, (_, i) => i);
  }

  displayChar(r: number, c: number): string {
    return this.state()[r]?.[c] ?? ' ';
  }

  private randomChar(): string {
    const alphabet = this.uppercase ? this.alphabetUpper : this.alphabetLower;
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  private randomCharOrSpace(target: string): string {
    return target === ' ' ? ' ' : this.randomChar();
  }

  // --- core logic ---

  isSpinning(r: number, c: number): boolean {
    const sm = this.spinningMap();
    return !!(sm[r] && sm[r][c]);
  }

  private setupFromWords(words: string[]) {
    this.clearAll();

    const normalized = (words ?? []).map((s) => {
      const v = (s ?? '').toString();
      return this.uppercase ? v.toUpperCase() : v.toLowerCase();
    });

    this._words.set(normalized);

    const maxLen = Math.max(...normalized.map((r) => r.length));
    const padded = normalized.map((r) => r.padEnd(maxLen, ' '));

    this.targets.set(padded.map((r) => r.split('')));
    this.state.set(
      padded.map((r) => r.split('').map((ch) => this.randomCharOrSpace(ch)))
    );
    this.spinningMap.set(padded.map((r) => r.split('').map(() => false)));

    // init timer matrix
    this.timers = padded.map((r) => r.split('').map(() => 0));
  }

  /** Keep spinning every non-space cell until reveal is called */
  private spinIndefinitely() {
    const targets = this.targets();
    const state = this.state();
    const spinning = this.spinningMap();

    this.clearAll();

    targets.forEach((row, r) => {
      row.forEach((target, c) => {
        if (target === ' ') {
          state[r][c] = ' ';
          spinning[r][c] = false;
          return;
        }

        spinning[r][c] = true;

        this.timers[r][c] = window.setInterval(() => {
          state[r][c] = this.randomChar();
          // clone to trigger change detection for signals
          this.state.set(state.map((row) => [...row]));
        }, this.tickMs);
      });
    });

    this.state.set(state.map((row) => [...row]));
    this.spinningMap.set(spinning.map((row) => [...row]));
  }

  /** Instantly reveal the final words (no animation flourish) */
  private reveal() {
    const targets = this.targets();
    this.clearAll();
    this.state.set(targets.map((r) => [...r]));
    this.spinningMap.set(targets.map((r) => r.map(() => false)));
  }

  private clearAll() {
    this.timers?.forEach((row) =>
      row.forEach((id) => id && window.clearInterval(id))
    );
  }
}
