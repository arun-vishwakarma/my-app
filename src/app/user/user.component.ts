import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpaceValidators } from '../common/validators/space.validators';
import { UniqueValidators } from '../common/validators/unique.validators';
import { UserService } from '../common/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   users:any;
   userCreated = false;
   msg:string;

   isLoading = false;

  /*Notes: below (FormGroup/FormControl) can be replace with FormBuilder for large and 
  complex form to make it more shorter, and also use nested FormGroup*/
  form = new FormGroup({
    fullname: new FormControl('',[
      Validators.required,
      Validators.minLength(4)   
    ]), 
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      SpaceValidators.cannotContainSpace       
    ],
    UniqueValidators.shouldBeUnique(this.service)
    ),   
    email : new FormControl('',[
      Validators.required,
      Validators.email
    ],
    UniqueValidators.shouldBeUnique(this.service)
    ),  //first parameter use for default value
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private service: UserService) {      
      //let us = new UserService();
      //console.log(us.test());
  }

  ngOnInit() {
  }
 
  signUp(){

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    let postData = {
      fullname:this.form.value.fullname,
      email:this.form.value.email,
      username:this.form.value.username,
      password:this.form.value.password   
    };
    
    //loading like ajax
    this.isLoading = true;
    this.form.reset(); //reset form after get values

    this.service.create(postData)
             .subscribe(response=>{
               console.log('user created ',response);
               //this.msg = response.json().message;
               this.msg = response.message;
               this.userCreated = true;
               this.hideMsg();
               this.isLoading = false;
               //this.form.reset(); //reset form after get values
             });

    /*let valid = null;
    if(!valid){
      this.form.setErrors({
        inValidSignUp:true
      });
    }*/
  }

  //hide mesage after some delay
  hideMsg(){
    setTimeout(()=>{
      this.userCreated = false;
    },5000);
  }

  //get form control name
  get fullname(){  return this.form.get('fullname');  }
  get username(){ return this.form.get('username'); }
  get email(){ return this.form.get('email'); }
  get password(){ return this.form.get('password'); }

}
