import { HttpClient } from "@angular/common/http";

//import { Http } from "@angular/http";

export class DataService{
    //constructor(private url:string, private http:Http){ }

    constructor(private url:string, private http: HttpClient){}

    getUser(){
        //return this.http.get('https://jsonplaceholder.typicode.com/users'); //dummy/static for now
        return this.http.get<Array<{_id: string, fullname: string,email:string, username:string,password:string}>>(this.url);
    }
    
    createUser(postData){
        return this.http.post<{ message: string; userId: string }>(this.url,postData);
    }

    loginUser(postData){
        console.log(postData);
        //return false;
        return this.http.post<{token:string, expiresIn:number, email:string}>(this.url,postData);
    }
}