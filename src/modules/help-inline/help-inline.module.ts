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
import { SkyIconModule } from '../icon';

@NgModule({
  declarations: [
    SkyHelpInlineComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyIconModule
  ],
  exports: [
    SkyHelpInlineComponent
  ]
})
export class SkyHelpInlineModule { }
