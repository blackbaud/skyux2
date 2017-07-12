import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyVerticalTabComponent } from './vertical-tab.component';
import { SkyVerticalTabItemComponent } from './vertical-tab-item.component';
import { SkyVerticalTabHeaderComponent } from './vertical-tab-header.component';

@NgModule({
  declarations: [
    SkyVerticalTabComponent,
    SkyVerticalTabItemComponent,
    SkyVerticalTabHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyVerticalTabComponent,
    SkyVerticalTabItemComponent,
    SkyVerticalTabHeaderComponent
  ]
})
export class SkyVerticalTabModule { }
