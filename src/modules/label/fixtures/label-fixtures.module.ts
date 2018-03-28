import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { SkyLabelModule } from '../label.module';
import { LabelTestComponent } from './label.component.fixture';

@NgModule({
  declarations: [
    LabelTestComponent
  ],
  imports: [
    CommonModule,
    SkyLabelModule
  ],
  exports: [
    LabelTestComponent
  ]
})
export class SkyLabelFixturesModule { }
