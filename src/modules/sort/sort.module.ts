import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkySortComponent } from './sort.component';
import { SkySortItemComponent } from './sort-item.component';
import { SkyDropdownModule } from '../dropdown';
import { SkyResourcesModule } from '../resources';
import { SkyMediaQueryModule } from '../media-queries';

@NgModule({
  declarations: [
    SkySortComponent,
    SkySortItemComponent
  ],
  imports: [
    CommonModule,
    SkyDropdownModule,
    SkyMediaQueryModule,
    SkyResourcesModule
  ],
  exports: [
    SkySortComponent,
    SkySortItemComponent
  ]
})
export class SkySortModule { }
