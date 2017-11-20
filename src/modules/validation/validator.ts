import { AbstractControl, Validator } from '@angular/forms';

export abstract class SkyValidator implements Validator {
  constructor(
    protected validatorName: string,
    protected regex: RegExp
  ) { }

  public validate(control: AbstractControl): { [key: string]: any } {
    const value = control.value;

    if (!value || this.testRegex(value)) {
      return;
    }

    return {
      [this.validatorName]: {
        invalid: control.value
      }
    };
  }

  private testRegex(value: string): boolean {
    return this.regex.test(value);
  }
}
