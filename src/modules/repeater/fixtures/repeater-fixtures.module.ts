import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { SkyRepeaterModule } from '../repeater.module';
import { RepeaterTestComponent } from './repeater.component.fixture';

@NgModule({
  declarations: [
    RepeaterTestComponent
  ],
  imports: [
    CommonModule,
    SkyRepeaterModule
  ],
  exports: [
    RepeaterTestComponent
  ]
})
export class SkyRepeaterFixturesModule { }
