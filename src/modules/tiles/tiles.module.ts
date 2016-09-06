import { NgModule } from '@angular/core';

import { SkyTileModule } from './tile';
import { SkyTileContentModule } from './tile-content';
import { SkyTileDashboardModule } from './tile-dashboard';
import { SkyTileDashboardColumnModule } from './tile-dashboard-column';

@NgModule({
  exports: [
    SkyTileContentModule,
    SkyTileModule,
    SkyTileDashboardColumnModule,
    SkyTileDashboardModule
  ]
})
export class SkyTilesModule { }
