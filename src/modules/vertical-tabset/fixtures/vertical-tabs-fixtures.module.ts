import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyVerticalTabsetModule } from '../';
import { VerticalTabsetTestComponent } from './vertical-tabset.component.fixture';

@NgModule({
  declarations: [
    VerticalTabsetTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyVerticalTabsetModule
  ],
  exports: [
    VerticalTabsetTestComponent
  ]
})
export class SkyVerticalTabsFixturesModule { }
