import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyChevronModule } from '../../chevron';
import { SkyResourcesModule } from '../../resources';

import { SkyTileComponent } from './tile.component';
import { SkyTileSummaryComponent } from './tile-summary.component';
import { SkyTileTitleComponent } from './tile-title.component';

@NgModule({
  declarations: [
    SkyTileComponent,
    SkyTileSummaryComponent,
    SkyTileTitleComponent
  ],
  imports: [
    CommonModule,
    SkyChevronModule,
    SkyResourcesModule
  ],
  exports: [
    SkyTileComponent,
    SkyTileSummaryComponent,
    SkyTileTitleComponent
  ]
})
export class SkyTileModule { }
