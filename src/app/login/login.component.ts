import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpaceValidators } from '../common/validators/Space.validators';
import { LoginService } from '../common/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin:boolean;

  form = new FormGroup({
   
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      SpaceValidators.cannotContainSpace       
    ]),   
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private service: LoginService) { }

  ngOnInit() {
  }

  signIn(){
    //console.log(this.form.value);
    let postData = {
      username:this.form.value.username,
      password:this.form.value.password   
    };
    

    this.service.loginUser(postData)
             .subscribe(response=>{
               //console.log('Login',response);
               this.isLogin = response.json();            
             });
  }

  get username(){ return this.form.get('username'); }
  get password(){ return this.form.get('password'); }



}
