import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyProgressIndicatorItemComponent } from './progress-indicator-item';
import { SkyProgressIndicatorComponent } from './progress-indicator.component';
import { SkyProgressIndicatorNavButtonComponent } from './progress-indicator-nav-button';
import { SkyProgressIndicatorTitleComponent } from './progress-indicator-title';

@NgModule({
  declarations: [
    SkyProgressIndicatorItemComponent,
    SkyProgressIndicatorComponent,
    SkyProgressIndicatorNavButtonComponent,
    SkyProgressIndicatorTitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyProgressIndicatorItemComponent,
    SkyProgressIndicatorComponent,
    SkyProgressIndicatorNavButtonComponent,
    SkyProgressIndicatorTitleComponent
  ]
})
export class SkyProgressIndicatorModule { }
