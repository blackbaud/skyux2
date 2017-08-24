import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SkyPopoverComponent,
  SkyPopoverTargetDirective
} from './index';

@NgModule({
  declarations: [
    SkyPopoverComponent,
    SkyPopoverTargetDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyPopoverComponent,
    SkyPopoverTargetDirective
  ]
})
export class SkyPopoverModule {}
