import { Component, OnInit } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, RouterOutlet, Routes } from "@angular/router";
import { LoadingPage } from "./pages/loading-page/loading-page";
import { Home } from "./pages/home/home";
import { InitGuard } from "./guard/init.guard";
import { ProjectWrapper } from "./pages/project-wrapper/project-wrapper";

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: "app-root",
  templateUrl: "./main.html",
  styleUrl: "./main.scss",
})
export class App implements OnInit {
  ngOnInit() {}
}

const routes: Routes = [
  { path: "", component: LoadingPage },
  { path: "home", component: Home, canActivate: [InitGuard] },
  {
    path: "project/:code",
    component: ProjectWrapper,
    canActivate: [InitGuard],
  },
  { path: "", redirectTo: "", pathMatch: "full" },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});
