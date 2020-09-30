import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    { provide: NG_VALIDATORS, 
      useExisting: forwardRef(() => PasswordMatchDirective), 
      multi: true 
    }
  ]
})
export class PasswordMatchDirective {
  @Input() appPasswordMatch: string;
  
  validate(control: AbstractControl): {[key: string]: any} | null {
    const controlToCompare = control.parent.get(this.appPasswordMatch);

    if(controlToCompare && controlToCompare.value !== control.value) {
      return { 'notEqual': true };
    }
  }
}
