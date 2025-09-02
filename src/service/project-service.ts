import { Injectable } from "@angular/core";
import { projects } from "../data/projects";
import { Project } from "../model/project.model";

@Injectable({ providedIn: "root" })
export class ProjectService {
  private projects = projects;

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectByCode(code: string): Project | undefined {
    return this.projects.find((p) => p.code === code);
  }
}
