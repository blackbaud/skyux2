import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SkyPopoverComponent,
  SkyPopoverTargetDirective,
  SkyPopoverCloseDirective
} from './index';

@NgModule({
  declarations: [
    SkyPopoverComponent,
    SkyPopoverTargetDirective,
    SkyPopoverCloseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyPopoverComponent,
    SkyPopoverTargetDirective,
    SkyPopoverCloseDirective
  ]
})
export class SkyPopoverModule {}
