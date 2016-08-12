import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyChevronModule } from '../chevron';
import { SkyResourcesModule } from '../resources';

import { SkyTileComponent } from './tile';
import { SkyTileContentSectionComponent } from './tile-content-section';
import { SkyTileDashboardComponent } from './tile-dashboard';
import { SkyTileDashboardColumnComponent } from './tile-dashboard-column';

@NgModule({
  declarations: [
    SkyTileComponent,
    SkyTileContentSectionComponent,
    SkyTileDashboardComponent,
    SkyTileDashboardColumnComponent
  ],
  imports: [
    CommonModule,
    SkyChevronModule,
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
