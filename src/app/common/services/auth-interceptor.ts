import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private loginService:LoginService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const authToken = this.loginService.getToken();

        console.log('intercept ',authToken);

        const authRequest = req.clone({
            headers:req.headers.set("Authorization","Bearer "+authToken)
        });
        return next.handle(authRequest);
    }
}
