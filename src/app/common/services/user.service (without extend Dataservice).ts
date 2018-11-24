import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'  //using this line no need add service class for provider in app.module.ts
})
export class UserService {
  private url = 'http://localhost:3000/api/users';
  constructor(private http: Http) { }

  getUser(){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  createUser(postData){
    return this.http.post(this.url,postData);
  }

  //test(){ return 1;}
}
