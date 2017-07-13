import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyVerticalTabsetComponent } from './vertical-tabset.component';
import { SkyVerticalTabsetItemComponent } from './vertical-tabset-item.component';
import { SkyVerticalTabsetHeaderComponent } from './vertical-tabset-header.component';

@NgModule({
  declarations: [
    SkyVerticalTabsetComponent,
    SkyVerticalTabsetItemComponent,
    SkyVerticalTabsetHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyVerticalTabsetComponent,
    SkyVerticalTabsetItemComponent,
    SkyVerticalTabsetHeaderComponent
  ]
})
export class SkyVerticalTabsetModule { }
