import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {
  /** 0..100 */
  @Input() set progress(v: number) {
    const n = Number(v);
    this._progress = isNaN(n) ? 0 : Math.min(100, Math.max(0, n));
  }
  get progress() {
    return this._progress;
  }
  private _progress = 0;

  @Input() height = 3;
  @Input() trackColor = '#2f2f2f';
  @Input() fillColor = '#ffffff';
  @Input() width: string = '100%';

  // expose 0..1 for CSS var
  get progressFraction() {
    return this._progress / 100;
  }
}
