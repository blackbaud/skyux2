import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SkyVerticalTabsetComponent } from './vertical-tabset.component';
import { SkyVerticalTabComponent } from './vertical-tab.component';
import { SkyVerticalTabsetGroupComponent } from './vertical-tabset-group.component';
import { SkyChevronModule } from './../chevron/chevron.module';
import { SkyIconModule } from '../icon';

@NgModule({
  declarations: [
    SkyVerticalTabsetComponent,
    SkyVerticalTabsetGroupComponent,
    SkyVerticalTabComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SkyChevronModule,
    SkyIconModule
  ],
  exports: [
    SkyVerticalTabsetComponent,
    SkyVerticalTabsetGroupComponent,
    SkyVerticalTabComponent
  ]
})
export class SkyVerticalTabsetModule { }
