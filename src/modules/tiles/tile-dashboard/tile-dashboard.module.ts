import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { SkyMediaQueriesModule } from '../../media-queries';

import { SkyTileDashboardComponent } from './tile-dashboard.component';
import { SkyTileDashboardColumnModule } from '../tile-dashboard-column';

@NgModule({
  declarations: [
    SkyTileDashboardComponent
  ],
  providers: [
    DragulaService
  ],
  imports: [
    CommonModule,
    SkyMediaQueriesModule,
    SkyTileDashboardColumnModule
  ],
  exports: [
    SkyTileDashboardComponent
  ]
})
export class SkyTileDashboardModule { }
