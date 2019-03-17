import { HttpClient } from "@angular/common/http";

/* need to work on error haldling using below  + HttpErrorResponse*/
//import { throwError as observableThrowError,Observable } from 'rxjs';
//import { catchError} from 'rxjs/operators';

export class DataService{
    constructor(private url:string, private http: HttpClient){}

    get(username:string){
        //return this.http.get('https://jsonplaceholder.typicode.com/users'); //dummy/static for now
        return this.http.get<{_id: string, fullname: string,email:string, username:string,password:string}>(this.url+'/'+username);
    }

    getAll(){
        //return this.http.get('https://jsonplaceholder.typicode.com/users'); //dummy/static for now
        return this.http.get<Array<{_id: string, fullname: string,email:string, username:string,password:string}>>(this.url);
    }
    
    create(postData:any){
        return this.http.post<{ message: string; userId: string }>(this.url,postData);
    }

    
}