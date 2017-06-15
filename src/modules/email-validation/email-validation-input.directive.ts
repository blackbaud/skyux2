import { Directive, forwardRef } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

const SKY_EMAIL_VALIDATION_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyEmailValidationInputDirective),
  multi: true
};

@Directive({
  selector: '[skyEmailValidationInput]',
  providers: [SKY_EMAIL_VALIDATION_VALIDATOR]
})

export class SkyEmailValidationInputDirective implements Validator{

  public validate(control: AbstractControl): {[key: string]: any} {
    let value = control.value;

    if(!value) {
      return;
    }

    if(!this.emailIsValid(value)){
      return {
        'skyEmail': {
          invalid: control.value
        }
      };
    }

  }

  public emailIsValid(email: string): boolean {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }






 /*     @HostListener('document:keydown', ['$event'])
    public onChange(event: any){
      let newInput = event.target.value;

    }



  @HostListener('change', ['$event'])
  public onChange(event: any) {
    let newValue = event.target.value;
    // need to parse date here:
    this.modelValue = this.dateFormatter.getDateFromString(newValue, this.dateFormat);
    if (this.dateFormatter.dateIsValid(this.modelValue)) {
      this._onChange(this.modelValue);
      this.writeModelValue(this.modelValue);
    } else {
      this._onChange(newValue);
    }
  }*/



}