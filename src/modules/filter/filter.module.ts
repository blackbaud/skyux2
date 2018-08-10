import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyResourcesModule } from '../resources';

import { SkyFilterButtonComponent} from './filter-button.component';
import { SkyFilterSummaryComponent } from './filter-summary.component';
import { SkyFilterSummaryItemComponent } from './filter-summary-item.component';
import { SkyFilterInlineComponent } from './filter-inline.component';
import { SkyFilterInlineItemComponent } from './filter-inline-item.component';

import {
  SkyTokensModule
} from '../tokens';
import { SkyIconModule } from '../icon';

@NgModule({
  declarations: [
    SkyFilterButtonComponent,
    SkyFilterInlineComponent,
    SkyFilterInlineItemComponent,
    SkyFilterSummaryComponent,
    SkyFilterSummaryItemComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyTokensModule,
    SkyIconModule
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
