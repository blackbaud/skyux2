import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { SkyChevronModule } from '../chevron';
import { SkyMediaQueriesModule } from '../media-queries';
import { SkyResourcesModule } from '../resources';

import { SkyTileComponent } from './tile';
import { SkyTileContentSectionComponent } from './tile-content-section';
import { SkyTileDashboardComponent, SkyTileDashboardService } from './tile-dashboard';
import { SkyTileDashboardColumnComponent } from './tile-dashboard-column';

@NgModule({
  declarations: [
    SkyTileComponent,
    SkyTileContentSectionComponent,
    SkyTileDashboardComponent,
    SkyTileDashboardColumnComponent
  ],
  providers: [
    DragulaService,
    SkyTileDashboardService
  ],
  imports: [
    CommonModule,
    SkyChevronModule,
    SkyMediaQueriesModule,
    SkyResourcesModule
  ],
  exports: [
    SkyTileComponent,
    SkyTileContentSectionComponent,
    SkyTileDashboardComponent,
    SkyTileDashboardColumnComponent
  ]
})
export class SkyTilesModule { }
