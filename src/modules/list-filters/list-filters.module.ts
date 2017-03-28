import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyFilterModule } from '../filter';

import { SkyListFilterButtonComponent } from './list-filter-button.component';
import { SkyListFilterSummaryComponent } from './list-filter-summary.component';
import { SkyListFiltersInlineComponent } from './list-filters-inline.component';
import { SkyListFilterInlineComponent } from './list-filter-inline.component';
import { SkyListFilterInlineRendererComponent } from './list-filter-inline-renderer.component';

@NgModule({
  declarations: [
    SkyListFilterButtonComponent,
    SkyListFilterSummaryComponent,
    SkyListFiltersInlineComponent,
    SkyListFilterInlineComponent,
    SkyListFilterInlineRendererComponent
  ],
  imports: [
    CommonModule,
    SkyFilterModule
  ],
  exports: [
    SkyListFilterButtonComponent,
    SkyListFilterSummaryComponent,
    SkyListFiltersInlineComponent,
    SkyListFilterInlineComponent,
    SkyListFilterInlineRendererComponent
  ]
})
export class SkyListFiltersModule { }
