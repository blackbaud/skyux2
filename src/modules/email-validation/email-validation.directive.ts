import { Directive, forwardRef } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

// tslint:disable:no-forward-ref no-use-before-declare
const SKY_EMAIL_VALIDATION_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyEmailValidationDirective),
  multi: true
};
// tslint:enable

@Directive({
  selector: '[skyEmailValidation]',
  providers: [SKY_EMAIL_VALIDATION_VALIDATOR]
})

export class SkyEmailValidationDirective implements Validator {

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
    let regex = /[\w\-]+@([\w\-]+\.)+[\w\-]+/;
    return regex.test(email);
  }
}
