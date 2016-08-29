import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';

import { SkyMediaQueriesModule } from '../../media-queries';
import { SkyResourcesModule } from '../../resources';

import { SkyTileDashboardColumnComponent } from './tile-dashboard-column.component';

@NgModule({
  declarations: [
    Dragula,
    SkyTileDashboardColumnComponent
  ],
  providers: [
    DragulaService
  ],
  imports: [
    CommonModule,
    SkyMediaQueriesModule,
    SkyResourcesModule
  ],
  exports: [
    SkyTileDashboardColumnComponent
  ]
})
export class SkyTileDashboardColumnModule { }
