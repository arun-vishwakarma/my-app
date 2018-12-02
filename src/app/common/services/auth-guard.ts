import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, Router } from "@angular/router";

import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private loginService:LoginService, private router:Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): boolean | Observable<boolean> | Promise<boolean> {

        const isAuth = this.loginService.getIsAuth();

        console.log('Auth guard',isAuth);
        //console.log("route-access",state);
        
        if(!isAuth){
            this.router.navigate(['/login']);
        }

        //if user login, can't access login or register page
        /*if(isAuth && (state.url=='/login' || state.url=='/register')){
            this.router.navigate(['/']);
        }*/


        return isAuth;
      }
}