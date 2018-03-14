import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyWindowRefService
} from '../window';

import { SkyPopoverComponent } from './popover.component';
import { SkyPopoverDirective } from './popover.directive';

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
  ],
  providers: [
    SkyWindowRefService
  ]
})
export class SkyPopoverModule { }
