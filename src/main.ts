import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RollingLetters } from './components/rolling-letters/rolling-letters';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { provideRouter, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, RollingLetters, ProgressBar],
  standalone: true,
  selector: 'app-root',
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class App implements OnInit, AfterViewInit {

  isAppReady = signal(false);
  showSplash = signal(true);
  isFadingOut = signal(false);
  progress = signal(0);
  fadeDelayMs = 1600;

  ngOnInit() {
    // Example bridge: move to ~90% until ready, then 100%
    const tick = 100;
    const id = setInterval(() => {
      if (!this.isAppReady()) {
        this.progress.set(Math.min(90, this.progress() + 1.8)); // ~5s to 90%
      } else {
        this.progress.set(100);
        clearInterval(id);
      }
    }, tick);

    setTimeout(() => this.markReady(), 3000);

  }

  ngAfterViewInit(): void {
    // this.markReady();
  }

  markReady() {
    this.isAppReady.set(true);
    this.progress.set(100);
    this.isFadingOut.set(true);
  }

  onSplashAnimEnd(_: AnimationEvent) {
    if (this.isFadingOut()) this.showSplash.set(false); // remove splash from DOM
  }

  onSplashTransitionEnd(e: TransitionEvent) {
    console.log(' this.showSplash',  this.showSplash());
    
    // Only remove after the opacity transition completes on the splash root
    if ((e.target as HTMLElement).classList.contains('splash') && e.propertyName === 'opacity') {
      this.showSplash.set(false);
    }
  }
}

const routes: Routes = [
  { path: '', component: App },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});

