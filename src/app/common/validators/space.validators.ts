import { AbstractControl, ValidationErrors } from "@angular/forms";

export class SpaceValidators{
    static cannotContainSpace(control:AbstractControl) : ValidationErrors | null {
        //console.log('space validation ',control.value);  //i.e auto display without use on fieled?
        if(control.value && (control.value as string).indexOf(' ') >=0)
            return {cantspace : true}
        return null;
    }
}