import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyResourcesModule
} from '../resources';

import { SkyAlertComponent } from './alert.component';

@NgModule({
  declarations: [
    SkyAlertComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkyAlertComponent
  ]
})
export class SkyAlertModule { }
