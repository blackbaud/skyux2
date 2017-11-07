import { AbstractControl, Validator } from '@angular/forms';

export abstract class SkyValidator implements Validator {
  constructor(
    protected validatorName: string,
    protected regex: RegExp
  ) { }

  public validate(control: AbstractControl): { [key: string]: any } {
    const value = control.value;

    if (!value || this.regex.test(value)) {
      return;
    }

    return {
      [this.validatorName]: {
        invalid: control.value
      }
    };
  }
}