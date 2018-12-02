import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
//import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'  //using this line no need add service class for provider in app.module.ts
})
export class UserService extends DataService{
  constructor(http:HttpClient) {
    super('http://localhost:3000/api/users',http);
   }
  //test(){ return 1;}
}
