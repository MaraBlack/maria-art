import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RollingLetters } from './components/rolling-letters/rolling-letters';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { provideRouter, RouterOutlet, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, RouterOutlet, RollingLetters, ProgressBar],
  standalone: true,
  selector: 'app-root',
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class App implements OnInit {
  isAppReady = false;
  showSplash = true;    // controls *ngIf
  isFadingOut = false;  // adds the .hide class to animate out
  progress = 0;         // 0..100 for your determinate bar
  fadeDelayMs = 1600;

  ngOnInit() {
    // Example bridge: move to ~90% until ready, then 100%
    const tick = 100;
    const id = setInterval(() => {
      if (!this.isAppReady) {
        this.progress = Math.min(90, this.progress + 1.8); // ~5s to 90%
      } else {
        this.progress = 100;
        clearInterval(id);
      }
    }, tick);

    // Simulate boot; in real app, call markReady() when your init finishes
    setTimeout(() => this.markReady(), 3000);
  }

  markReady() {
    this.isAppReady = true;   // letters reveal + progress hits 100%
    this.progress = 100;
    this.isFadingOut = true;  // triggers .splash.hide (CSS handles delay/ease)
  }

  onSplashAnimEnd(_: AnimationEvent) {
    if (this.isFadingOut) this.showSplash = false; // remove splash from DOM
  }

  onSplashTransitionEnd(e: TransitionEvent) {
    // Only remove after the opacity transition completes on the splash root
    if ((e.target as HTMLElement).classList.contains('splash') && e.propertyName === 'opacity') {
      this.showSplash = false;
    }
  }
}

const routes: Routes = [
  { path: '', component: App },
  // other routes...
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});

