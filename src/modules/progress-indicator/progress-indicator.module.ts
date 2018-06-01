import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyPopoverModule } from '../popover';
import { SkyHelpInlineModule } from '../help-inline';

import { SkyProgressIndicatorItemComponent } from './progress-indicator-item';
import { SkyProgressIndicatorComponent } from './progress-indicator.component';

@NgModule({
  declarations: [
    SkyProgressIndicatorItemComponent,
    SkyProgressIndicatorComponent
  ],
  imports: [
    CommonModule,
    SkyHelpInlineModule,
    SkyPopoverModule
  ],
  exports: [
    SkyProgressIndicatorItemComponent,
    SkyProgressIndicatorComponent
  ]
})
export class SkyProgressIndicatorModule { }
