import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyChevronModule } from '../../chevron';
import { SkyResourcesModule } from '../../resources';

import { SkyTileComponent } from './tile.component';

@NgModule({
  declarations: [
    SkyTileComponent
  ],
  imports: [
    CommonModule,
    SkyChevronModule,
    SkyResourcesModule
  ],
  exports: [
    SkyTileComponent
  ]
})
export class SkyTileModule { }
