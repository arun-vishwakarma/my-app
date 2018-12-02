import { Component, OnInit } from '@angular/core';
import { LoginService } from './common/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Akv Chat Application';

  //constructor(private loginService:LoginService){}

  constructor(private loginService:LoginService, private router: Router) {}

  ngOnInit(){
    console.log('App component');
    
    //on page load check if user login or not and set authentication (1st)
    this.loginService.autoAuthUser(); 
    
    //Common check for all required pages (e.g login, register), if user login reditect to home page or other page (2nd)
    if (this.loginService.getIsAuth()) {
      this.router.navigate(['/']);
    }
  }
}
