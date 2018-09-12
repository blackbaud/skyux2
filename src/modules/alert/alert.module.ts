import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  SkyResourcesModule
} from '../resources';
import {
  SkyIconModule
} from '../icon';

import {
  SkyAlertComponent
} from './alert.component';

@NgModule({
  declarations: [SkyAlertComponent],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyIconModule
  ],
  exports: [SkyAlertComponent]
})
export class SkyAlertModule { }
