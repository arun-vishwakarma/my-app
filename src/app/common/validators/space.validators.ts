import { AbstractControl, ValidationErrors } from "@angular/forms";

export class SpaceValidators{
    static cannotContainSpace(control:AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >=0)
            return {cantspace : true}
        return null;
    }
}