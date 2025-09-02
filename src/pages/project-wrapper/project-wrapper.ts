import { Component, HostListener, OnChanges, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "../../model/project.model";
import { ProjectService } from "../../service/project-service";
import { ProjectDetail } from "./components/project-detail/project-detail";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-project-wrapper",
  imports: [CommonModule, ProjectDetail],
  templateUrl: "./project-wrapper.html",
  styleUrl: "./project-wrapper.css",
})
export class ProjectWrapper implements OnInit {
  projects: Project[] = [];
  currentIndex = 0;
  isAnimating = false;
  scrollLocked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();

    this.route.paramMap.subscribe((params) => {
      const code = params.get("code");
      const index = this.projects.findIndex((p) => p.code === code);
      if (index !== -1) {
        this.currentIndex = index;
      }
    });
  }

  get currentProject(): Project {
    return this.projects[this.currentIndex];
  }

  get prevProject(): Project | null {
    return this.currentIndex > 0 ? this.projects[this.currentIndex - 1] : null;
  }

  get nextProject(): Project | null {
    return this.currentIndex < this.projects.length - 1
      ? this.projects[this.currentIndex + 1]
      : null;
  }

  @HostListener("window:wheel", ["$event"])
  onScroll(event: WheelEvent) {
    if (this.scrollLocked) return;

    const direction =
      event.deltaY > 50 ? "down" : event.deltaY < -50 ? "up" : null;
    if (direction) {
      this.scrollLocked = true;
      this.navigate(direction);
      setTimeout(() => (this.scrollLocked = false), 600); //  match animation  duration
    }
  }

  navigate(direction: "up" | "down") {
    const newIndex =
      direction === "up" ? this.currentIndex - 1 : this.currentIndex + 1;

    if (newIndex >= 0 && newIndex < this.projects.length) {
      this.isAnimating = true;

      setTimeout(() => {
        const newCode = this.projects[newIndex].code;
        this.router.navigate(["/project", newCode]);
        this.isAnimating = false;
      }, 300); //  match  transition duration
    }
  }

  onClose() {
    this.router.navigate(["/"]);
  }
}
