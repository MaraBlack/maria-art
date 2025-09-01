import { Component, HostListener } from "@angular/core";
import { projects } from "../../data/projects";
import { CommonModule } from "@angular/common";
import { Project } from "../../model/project.model";

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

  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.isMobile = window.innerWidth < 768;
  }

  setActive(project: any) {
    this.activeProject = project;
  }
}
