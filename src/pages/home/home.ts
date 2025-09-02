import { Component, HostListener, inject } from "@angular/core";
import { projects } from "../../data/projects";
import { CommonModule } from "@angular/common";
import { Project } from "../../model/project.model";
import { Router } from "@angular/router";
import { ProjectService } from "../../service/project-service";

@Component({
  selector: "app-home",
  imports: [CommonModule],
  templateUrl: "./home.html",
  styleUrl: "./home.scss",
})
export class Home {
  projects: Project[] = projects;
  images = projects.map((p) => p.image);
  isMobile = false;
  activeProject: any = null;

  projectService = inject(ProjectService);
  router = inject(Router);

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 768;
  }

  constructor() {
    this.projects = this.projectService.getProjects();
  }

  setActive(project: any) {
    this.activeProject = project;

    this.goToProject(project.code);
  }

  goToProject(code: string): void {
    this.router.navigate(["/project", code]);
  }
}
