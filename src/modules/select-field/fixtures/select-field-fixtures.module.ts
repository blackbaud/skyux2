import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkySelectFieldModule } from '../select-field.module';
import { SkySelectFieldTestComponent } from './select-field.component.fixture';

@NgModule({
  declarations: [
    SkySelectFieldTestComponent
  ],
  imports: [
    CommonModule,
    SkySelectFieldModule
  ],
  exports: [
    SkySelectFieldTestComponent
  ]
})
export class SkySelectFieldFixturesModule { }
