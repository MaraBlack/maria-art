import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ProgressBar } from "../../components/progress-bar/progress-bar";
import { RollingLetters } from "../../components/rolling-letters/rolling-letters";
import { AppInitService } from "../../service/app-init";
import { Router } from "@angular/router";

@Component({
  selector: "app-loading-page",
  imports: [CommonModule, ProgressBar, RollingLetters],
  templateUrl: "./loading-page.html",
  styleUrl: "./loading-page.css",
})
export class LoadingPage {
  progress = 0;

  private appInit = inject(AppInitService);
  private router = inject(Router);

  constructor() {}

  async ngOnInit() {
    this.appInit.progress$.subscribe((p) => {
      this.progress = p;

      console.log(p);

      //  Navigate  when  progress reaches  100
      if (p === 100) {
        this.router.navigate(["/home"]);
      }
    });

    await this.appInit.initializeApp();
  }
}
