import { NgModule } from '@angular/core';

import { SkyVerticalTabComponent } from './vertical-tab.component';
import { SkyVerticalTabItemComponent } from './vertical-tab-item.component';
import { SkyVerticalTabHeaderComponent } from './vertical-tab-header.component';

@NgModule({
  declarations: [
    SkyVerticalTabComponent,
    SkyVerticalTabItemComponent,
    SkyVerticalTabHeaderComponent
  ],
  exports: [
    SkyVerticalTabComponent,
    SkyVerticalTabItemComponent,
    SkyVerticalTabHeaderComponent
  ]
})
export class SkyVerticalTabModule { }
