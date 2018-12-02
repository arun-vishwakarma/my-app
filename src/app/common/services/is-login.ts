/*
to check for all required pages i.e is-login service with resolve keyword
    used in routes for all required pages/components
    - Not in use  (same thing done easily in app component)
*/
import { Injectable } from "@angular/core";
import {  Router } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class IsLoggedIn {
  constructor(
    private router: Router, 
    private loginService: LoginService) {
  }

  resolve(): void {
    if (this.loginService.getIsAuth()) this.router.navigate(['/chat']);
  }
}