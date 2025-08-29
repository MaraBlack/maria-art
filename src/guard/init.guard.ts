import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AppInitService } from "../service/app-init";

@Injectable({ providedIn: "root" })
export class InitGuard implements CanActivate {
  constructor(private appInit: AppInitService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (!this.appInit.initialized) {
      await this.appInit.initializeApp(); //  Wait  for init
    }

    if (this.appInit.initialized) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
