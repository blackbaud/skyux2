import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SkyPopoverComponent,
  SkyPopoverDirective
} from './index';

@NgModule({
  declarations: [
    SkyPopoverComponent,
    SkyPopoverDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyPopoverComponent,
    SkyPopoverDirective
  ]
})
export class SkyPopoverModule { }
