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

  constructor(private loginService: LoginService) { }

  ngOnInit() {

    console.log('Header component');

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
      console.log('2nd get value after login or logout using next');
    });

  }

  onLogout() {
    this.loginService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
