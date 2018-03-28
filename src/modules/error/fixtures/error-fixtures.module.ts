import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyErrorModule } from '../error.module';
import { ErrorTestComponent } from './error.component.fixture';

@NgModule({
  declarations: [
    ErrorTestComponent
  ],
  imports: [
    CommonModule,
    SkyErrorModule
  ],
  exports: [
    ErrorTestComponent
  ]
})
export class SkyErrorFixturesModule { }
