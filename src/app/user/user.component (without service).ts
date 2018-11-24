import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpaceValidators } from '../common/validators/Space.validators';
import { UniqueValidators } from '../common/validators/unique.validators';
import { Http } from '@angular/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   users:any;

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
    UniqueValidators.shouldBeUnique
    ),   
    email : new FormControl('',[
      Validators.required,
      Validators.email
    ]),  //first parameter use for default value
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6)
    ])
  });
 
  constructor(private http:Http) {
    http.get('https://jsonplaceholder.typicode.com/users')
        .subscribe(response=>{
          //console.log(response);
          this.users = response.json();
        });
  }

  createUser(input:HTMLElement){
    let postData = {name:'arun'};
    this.http.post('https://jsonplaceholder.typicode.com/users',postData)
             .subscribe(response=>{
               console.log(response);
             });
  }

  ngOnInit() {
  }

  signUp(){
    console.log(this.form.value);
    let postData = {
      fullname:this.form.value.fullname,
      email:this.form.value.email,
      username:this.form.value.username,
      password:this.form.value.password   
    };
    this.http.post('http://localhost:3000/api/users',postData)
             .subscribe(response=>{
               console.log(response);
             });

    /*let valid = null;
    if(!valid){
      this.form.setErrors({
        inValidSignUp:true
      });
    }*/
  }

  //get form control name
  get fullname(){  return this.form.get('fullname');  }
  get username(){ return this.form.get('username'); }
  get email(){ return this.form.get('email'); }
  get password(){ return this.form.get('password'); }

}
