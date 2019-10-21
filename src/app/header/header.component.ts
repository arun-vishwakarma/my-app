import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import {LoginService} from '../common/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  loginUser: string = '';

  constructor(private loginService: LoginService) { }
  
  /* 
             ***_________more clarify____________***
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();  //work with page load i.e using local storage
	
	  //work when no page reload (using memory i.e without local storage)
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }*/

  ngOnInit() {

    console.log('Header component');
    
    this.loginUser = this.loginService.getAuthUser();  //use here, if page reload and get login user if authenticated as below line describe also

    /*
      if page reload, before this component loaded
      app component is loaded so from app component first set isAuthenticated true and check here
      using below code
    */
    this.userIsAuthenticated = this.loginService.getIsAuth(); 
    

    console.log('first Subscribe observable for authentication');
    this.authListenerSubs = this.loginService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {   //1st subscribe is must to get value using next as implemented in login/logout fn
      
      this.userIsAuthenticated = isAuthenticated;

      //authStatusListener used as any type instaed of boolean
      /*
      if(isAuthenticated===true)
          this.userIsAuthenticated = isAuthenticated;
      else
        this.userIsAuthenticated = false; 
      */  

      console.log('2nd get value after login or logout using next');
      
      this.loginUser = this.loginService.getAuthUser(); //use to 1st time assign user same as userIsAuthenticated
    });

  }

  onLogout() {
    this.loginService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
