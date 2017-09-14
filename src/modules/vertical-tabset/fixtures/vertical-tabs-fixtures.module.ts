import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyVerticalTabsetModule } from '../';
import { VerticalTabsetTestComponent } from './vertical-tabset.component.fixture';
import { VerticalTabsetEmptyGroupTestComponent } from './vertical-tabset-empty-group.component';
import { VerticalTabsetNoActiveTestComponent } from './vertical-tabset-no-active.component.fixture';

@NgModule({
  declarations: [
    VerticalTabsetTestComponent,
    VerticalTabsetEmptyGroupTestComponent,
    VerticalTabsetNoActiveTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyVerticalTabsetModule
  ],
  exports: [
    VerticalTabsetTestComponent,
    VerticalTabsetEmptyGroupTestComponent,
    VerticalTabsetNoActiveTestComponent
  ]
})
export class SkyVerticalTabsFixturesModule { }
