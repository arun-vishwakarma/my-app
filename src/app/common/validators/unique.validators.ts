import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UniqueValidators{
    static shouldBeUnique(control:AbstractControl) : Promise<ValidationErrors | null> {

        return new Promise((resolve,reject) => {
            //Async operation
            setTimeout(()=>{
                if(control.value=='arun'){
                    resolve({shouldBeUnique : true })
                }else{
                    resolve(null);
                }
            });
        })
        
       
    }
}