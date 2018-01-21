import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule,
    CommonModule
  ],
  exports: [
    SkyPopoverComponent,
    SkyPopoverDirective
  ]
})
export class SkyPopoverModule { }
