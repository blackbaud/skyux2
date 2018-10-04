import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  SkyDropdownModule
} from '../dropdown';
import {
  SkyResourcesModule
} from '../resources';
import {
  SkyMediaQueryModule
} from '../media-queries';
import {
  SkyIconModule
} from '../icon';

import {
  SkySortComponent
} from './sort.component';
import {
  SkySortItemComponent
} from './sort-item.component';

@NgModule({
  declarations: [
    SkySortComponent,
    SkySortItemComponent
  ],
  imports: [
    CommonModule,
    SkyDropdownModule,
    SkyMediaQueryModule,
    SkyResourcesModule,
    SkyIconModule
  ],
  exports: [
    SkySortComponent,
    SkySortItemComponent
  ]
})
export class SkySortModule { }
