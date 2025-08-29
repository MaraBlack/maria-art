import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AppInitService {
  private isInitialized = false;
  private progressSubject = new BehaviorSubject<number>(0);
  progress$ = this.progressSubject.asObservable();

  private initPromise: Promise<void> | null = null;

  async initializeApp(): Promise<void> {
    if (this.isInitialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      await this.loadImages();
      this.isInitialized = true;
    })();

    return this.initPromise;
  }

  loadImages(): Promise<void> {
    const images = ["sketchbook.jpg", "digital.jpg", "photography.jpg"];
    let loaded = 0;

    return new Promise((resolve) => {
      images.forEach((src) => {
        const img = new Image();
        img.src = `../assets/${src}`;
        img.onload = () => {
          loaded++;
          this.progressSubject.next(Math.round((loaded / images.length) * 100));
          if (loaded === images.length) resolve();
        };
      });
    });
  }

  private fetchInitialData(): Promise<void> {
    return fetch("https://api.example.com/init")
      .then((res) => res.json())
      .then(() => {});
  }

  get initialized(): boolean {
    return this.isInitialized;
  }
}
