import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

import { SkyValidator } from './validation';

// tslint:disable:no-forward-ref no-use-before-declare
const SKY_URL_VALIDATION_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyUrlValidationDirective),
  multi: true
};
// tslint:enable

@Directive({
  selector: '[skyUrlValidation]',
  providers: [SKY_URL_VALIDATION_VALIDATOR]
})

export class SkyUrlValidationDirective extends SkyValidator {

  constructor() {
    super(
      'skyUrl',
      /^((http|https):\/\/)?([\w\-]+\.)+[\w\-]+/i
    );
  }

}
