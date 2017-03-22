import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyFilterButtonComponent} from './filter-button.component';
import { SkyFilterSummaryComponent } from './filter-summary.component';
import { SkyFilterSummaryItemComponent } from './filter-summary-item.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyFilterButtonComponent,
    SkyFilterSummaryComponent,
    SkyFilterSummaryItemComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkyFilterButtonComponent,
    SkyFilterSummaryComponent,
    SkyFilterSummaryItemComponent
  ]
})
export class SkyFilterModule { }
