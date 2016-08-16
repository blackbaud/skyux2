import { NgModule } from '@angular/core';

import { SkyTileModule } from './tile';
import { SkyTileContentSectionModule } from './tile-content-section';
import { SkyTileDashboardModule } from './tile-dashboard';
import { SkyTileDashboardColumnModule } from './tile-dashboard-column';

@NgModule({
  exports: [
    SkyTileContentSectionModule,
    SkyTileModule,
    SkyTileDashboardColumnModule,
    SkyTileDashboardModule
  ]
})
export class SkyTilesModule { }
