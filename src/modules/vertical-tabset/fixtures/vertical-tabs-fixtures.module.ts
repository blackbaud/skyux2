import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyVerticalTabsetModule } from '../';
import { VerticalTabsetTestComponent } from './vertical-tabset.component.fixture';
import { VerticalTabsetEmptyGroupTestComponent } from './vertical-tabset-empty-group.component';

@NgModule({
  declarations: [
    VerticalTabsetTestComponent,
    VerticalTabsetEmptyGroupTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyVerticalTabsetModule
  ],
  exports: [
    VerticalTabsetTestComponent,
    VerticalTabsetEmptyGroupTestComponent
  ]
})
export class SkyVerticalTabsFixturesModule { }
