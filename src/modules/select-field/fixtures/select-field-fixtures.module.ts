import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkySelectFieldModule } from '../select-field.module';
import { SkySelectFieldTestComponent } from './select-field.component.fixture';
import { SkySelectFieldFormTestComponent } from './select-field-form.component.fixture';
@NgModule({
  declarations: [
    SkySelectFieldTestComponent,
    SkySelectFieldFormTestComponent
  ],
  imports: [
    CommonModule,
    SkySelectFieldModule
  ],
  exports: [
    SkySelectFieldTestComponent,
    SkySelectFieldFormTestComponent
  ]
})
export class SkySelectFieldFixturesModule { }
