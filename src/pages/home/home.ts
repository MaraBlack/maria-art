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

    this.scrollToDataId(project.id);
  }

  scrollToDataId(dataId: number) {
    const container = document.getElementById("carousel");
    console.log("container", container);

    if (container) {
      const targetElement: HTMLElement | null = container.querySelector(
        `[data-i="${dataId}"]`
      );

      if (targetElement) {
        container.scrollTo({
          top: targetElement.offsetTop - container.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }
}
