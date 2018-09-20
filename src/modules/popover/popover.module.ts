import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyPopoverComponent
} from './popover.component';
import {
  SkyPopoverDirective
} from './popover.directive';
import {
  SkyResourcesModule
} from '../resources';
import {
  SkyIconModule
} from '../icon';

@NgModule({
  declarations: [
    SkyPopoverComponent,
    SkyPopoverDirective
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SkyResourcesModule,
    SkyIconModule
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
