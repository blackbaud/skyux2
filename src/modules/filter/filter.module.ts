import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyFilterButtonComponent} from './filter-button.component';
import { SkyFilterSummaryComponent } from './filter-summary.component';
import { SkyFilterSummaryItemComponent } from './filter-summary-item.component';
import { SkyFilterInlineComponent } from './filter-inline.component';
import { SkyFilterInlineItemComponent } from './filter-inline-item.component';

import {
  SkyResourcesModule
} from '../resources';

import {
  SkyTokensModule
} from '../tokens';

@NgModule({
  declarations: [
    SkyFilterButtonComponent,
    SkyFilterSummaryComponent,
    SkyFilterSummaryItemComponent,
    SkyFilterInlineComponent,
    SkyFilterInlineItemComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyTokensModule
  ],
  exports: [
    SkyFilterButtonComponent,
    SkyFilterSummaryComponent,
    SkyFilterSummaryItemComponent,
    SkyFilterInlineComponent,
    SkyFilterInlineItemComponent
  ]
})
export class SkyFilterModule { }
