import { NgModule } from '@angular/core';

import { SkyVerticalTabComponent } from './vertical-tab.component';
import { SkyVerticalTabItemComponent } from './vertical-tab-item.component';
import { SkyVerticalTabMenuComponent } from './vertical-tab-menu.component';

@NgModule({
  declarations: [
    SkyVerticalTabComponent,
    SkyVerticalTabItemComponent,
    SkyVerticalTabMenuComponent
  ],
  exports: [
    SkyVerticalTabComponent,
    SkyVerticalTabItemComponent,
    SkyVerticalTabMenuComponent
  ]
})
export class SkyVerticalTabModule { }
