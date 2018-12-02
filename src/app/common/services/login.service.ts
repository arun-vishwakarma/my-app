import { Injectable } from '@angular/core';
import { DataService } from './data.service';
//import { Http } from '@angular/http';

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { LoginData } from "../../model/login-data.model";


@Injectable({
  providedIn: 'root'  //using this line no need add service class for provider in app.module.ts
})
export class LoginService extends DataService{
  private isAuthenticated = false;
  private token: string;
  private authUser: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(http:HttpClient, private router: Router) {
    super('http://localhost:3000/api/login',http);
   }

  getToken() {
    return this.token;
  }

  getAuthUser(){
    return this.authUser; 
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(postData){
    const loginData: LoginData = { username: postData.username, password: postData.password };
    super.loginUser(loginData).subscribe((resp)=>{
        console.log('in login service - ',resp);
        //const response = resp.json();  //using Http
        const response = resp;  //using HttpClient
        const token = response.token;
        console.log('token ',response.token);
        this.token = token;
        this.authUser = response.email;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, response.email);
          this.router.navigate(["/"]);
        }
    })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.authUser = authInformation.email;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, email:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("email", email);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("email");
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');  
    const email = localStorage.getItem('email');      
    if(!token || !expirationDate){
      return;
    }
    return{
      email: email,
      token : token,
      expirationDate: new Date(expirationDate)
    }
  }


}
