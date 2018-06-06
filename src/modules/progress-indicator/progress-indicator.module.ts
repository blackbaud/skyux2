import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyProgressIndicatorItemComponent } from './progress-indicator-item';
import { SkyProgressIndicatorComponent } from './progress-indicator.component';

@NgModule({
  declarations: [
    SkyProgressIndicatorItemComponent,
    SkyProgressIndicatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyProgressIndicatorItemComponent,
    SkyProgressIndicatorComponent
  ]
})
export class SkyProgressIndicatorModule { }
