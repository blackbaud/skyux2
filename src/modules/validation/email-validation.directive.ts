import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

import { SkyValidator } from './validator';

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

export class SkyEmailValidationDirective extends SkyValidator {

  constructor() {
    super(
      'skyEmail',
      /[\w\-]+@([\w\-]+\.)+[\w\-]+/
    );
  }

}
