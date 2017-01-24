import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { SkyTileDashboardComponent } from './tile-dashboard.component';
import { SkyTileDashboardColumnModule } from '../tile-dashboard-column';
import { SkyMediaQueryModule } from '../../media-queries';

@NgModule({
  declarations: [
    SkyTileDashboardComponent
  ],
  providers: [
    DragulaService
  ],
  imports: [
    CommonModule,
    SkyTileDashboardColumnModule,
    SkyMediaQueryModule
  ],
  exports: [
    SkyTileDashboardComponent
  ]
})
export class SkyTileDashboardModule { }
