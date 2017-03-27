import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyFilterModule } from '../filter';

import { SkyListFilterButtonComponent } from './list-filter-button.component';
import { SkyListFilterSummaryComponent } from './list-filter-summary.component';

@NgModule({
  declarations: [
    SkyListFilterButtonComponent,
    SkyListFilterSummaryComponent
  ],
  imports: [
    CommonModule,
    SkyFilterModule
  ],
  exports: [
    SkyListFilterButtonComponent,
    SkyListFilterSummaryComponent
  ]
})
export class SkyListFiltersModule { }
