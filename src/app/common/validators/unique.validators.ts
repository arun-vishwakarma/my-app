import { AbstractControl, ValidationErrors } from "@angular/forms";
import { UserService } from "../services/user.service";


export class UniqueValidators{

    //can use constructor to initialize sevice object (in this case no need to pass service from form validatation)

    static shouldBeUnique(userService: UserService) {
        return (control: AbstractControl): Promise<ValidationErrors | null>  => {
            return new Promise((resolve,reject) => {
                //Async operation
                userService.get(control.value).subscribe((resp)=>{
                    console.log(resp);
                    if(resp && (control.value==resp.email || control.value==resp.username)){
                        resolve({shouldBeUnique : true })
                    }else{
                        resolve(null);
                    }
                });
            });  
        };
    }

    static shouldBeUnique2(control:AbstractControl) : Promise<ValidationErrors | null> {

        return new Promise((resolve,reject) => {
            //Async operation
            setTimeout(()=>{
                if(control.value=='arun'){
                    resolve({shouldBeUnique : true })
                }else{
                    resolve(null);
                }
            },1000);
        });       
       
    }
}