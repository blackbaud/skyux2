import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SkyValidationModule } from '../';
import { EmailValidationTestComponent } from './email-validation.component.fixture';

@NgModule({
  declarations: [
    EmailValidationTestComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SkyValidationModule
  ],
  exports: [
    EmailValidationTestComponent
  ]
})
export class SkyEmailValidationFixturesModule { }
