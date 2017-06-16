import { Directive, forwardRef } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

// tslint:disable no-forward-ref
const SKY_EMAIL_VALIDATION_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyEmailValidationInputDirective),
  multi: true
};
// tslint:enable

@Directive({
  selector: '[skyEmailValidationInput]',
  providers: [SKY_EMAIL_VALIDATION_VALIDATOR]
})

export class SkyEmailValidationInputDirective implements Validator {

  public validate(control: AbstractControl): {[key: string]: any} {
    let value = control.value;

    if (!value) {
      return;
    }

    if (!this.emailIsValid(value)) {
      return {
        'skyEmail': {
          invalid: control.value
        }
      };
    }

  }

  public emailIsValid(email: string): boolean {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/;
    return regex.test(email);
  }
}
