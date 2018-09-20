import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  SkyPagingComponent
} from './paging.component';
import {
  SkyResourcesModule
} from '../resources';
import {
  SkyIconModule
} from '../icon';

@NgModule({
  declarations: [
    SkyPagingComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyIconModule
  ],
  exports: [
    SkyPagingComponent
  ]
})
export class SkyPagingModule {
}
