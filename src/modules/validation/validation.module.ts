import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SkyEmailValidationDirective } from './email-validation.directive';
import { SkyUrlValidationDirective } from './url-validation.directive';

@NgModule({
  declarations: [
    SkyEmailValidationDirective,
    SkyUrlValidationDirective
  ],
  imports: [
    FormsModule
  ],
  exports: [
    SkyEmailValidationDirective,
    SkyUrlValidationDirective
  ]
})
export class SkyValidationModule { }
