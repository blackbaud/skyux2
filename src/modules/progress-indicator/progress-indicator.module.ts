import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyProgressIndicatorItemComponent } from './progress-indicator-item';
import { SkyProgressIndicatorComponent } from './progress-indicator.component';
import { SkyProgressIndicatorNavButtonComponent } from './progress-indicator-nav-button';

@NgModule({
  declarations: [
    SkyProgressIndicatorItemComponent,
    SkyProgressIndicatorComponent,
    SkyProgressIndicatorNavButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyProgressIndicatorItemComponent,
    SkyProgressIndicatorComponent,
    SkyProgressIndicatorNavButtonComponent
  ]
})
export class SkyProgressIndicatorModule { }
