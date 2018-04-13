import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { SkyFocusTrapDirective } from './focus-trap.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SkyFocusTrapDirective
  ],
  declarations: [
    SkyFocusTrapDirective
  ]
})
export class SkyFocusTrapModule { }
