import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpaceValidators } from '../common/validators/Space.validators';
import { LoginService } from '../common/services/login.service';
//import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isLogin: boolean;

  form = new FormGroup({

    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      SpaceValidators.cannotContainSpace
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private loginService:LoginService){}

  
  /*
    Below commented code use to check if user is login redirect to home page or any other page
    But other good way to check for all required pages i.e is-login service with resolve keyword
    used in routes for all required pages/components.
  */

  //constructor(private route:ActivatedRoute, private router:Router, private loginService:LoginService){}
 /*
  returnUrl : string;
  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // CHECK THE isLoggedIn STATE HERE 
    if (this.loginService.getIsAuth()) {
      this.router.navigate([this.returnUrl]);
    }

  }*/

  ngOnInit(){

  }

  signIn() {
    //console.log(this.form.value);
    let postData = {
      username: this.form.value.username,
      password: this.form.value.password
    };


    this.loginService.login(postData);
      
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }



}
