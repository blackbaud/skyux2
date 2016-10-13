import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyTabsModule } from '../';
import { TabsetTestComponent } from './tabset.component.fixture';

@NgModule({
  declarations: [
    TabsetTestComponent
  ],
  imports: [
    CommonModule,
    SkyTabsModule
  ],
  exports: [
    TabsetTestComponent
  ]
})
export class SkyTabsFixturesModule { }
