import { Http } from "@angular/http";

export class DataService{
    constructor(private url:string, private http:Http){ }

    getUser(){
        return this.http.get('https://jsonplaceholder.typicode.com/users'); //dummy/static for now
    }
    
    createUser(postData){
        return this.http.post(this.url,postData);
    }

    loginUser(postData){
        console.log(postData);
        //return false;
        return this.http.post(this.url,postData);
    }
}