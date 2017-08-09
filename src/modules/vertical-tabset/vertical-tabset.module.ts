import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SkyVerticalTabsetComponent } from './vertical-tabset.component';
import { SkyVerticalTabComponent } from './vertical-tab.component';
import { SkyTabGroupComponent } from './tab-group.component';

@NgModule({
  declarations: [
    SkyVerticalTabsetComponent,
    SkyTabGroupComponent,
    SkyVerticalTabComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    SkyVerticalTabsetComponent,
    SkyTabGroupComponent,
    SkyVerticalTabComponent
  ]
})
export class SkyVerticalTabsetModule { }
