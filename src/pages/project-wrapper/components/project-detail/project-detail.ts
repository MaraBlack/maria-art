import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../../../../service/project-service";
import { Project } from "../../../../model/project.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-project-detail",
  imports: [CommonModule],
  templateUrl: "./project-detail.html",
  styleUrl: "./project-detail.css",
})
export class ProjectDetail {
  isAnimating = false;
  animationClass = "";
  imageClass = "";

  @Input() project!: Project;
  @Input() prevProject: Project | null = null;
  @Input() nextProject: Project | null = null;

  @Output() navigateUp = new EventEmitter<void>();
  @Output() navigateDown = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  navigate(arg0: string) {
    throw new Error("Method not implemented.");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["project"]) {
      this.animationClass = ""; //  reset
      setTimeout(() => {
        this.animationClass = "reveal-left";
      }, 10); //  slight  delay  to re-trigger  animation
    }

    this.imageClass = ""; // reset
    setTimeout(() => {
      this.imageClass = "fade-in-image";
    }, 10);
  }
}
