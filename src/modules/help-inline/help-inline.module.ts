import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyResourcesModule
} from '../resources';

import { SkyHelpInlineComponent } from './help-inline.component';

@NgModule({
  declarations: [
    SkyHelpInlineComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkyHelpInlineComponent
  ]
})
export class SkyHelpInlineModule { }
