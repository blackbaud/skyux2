// #region imports
import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyResourcesModule
} from '../resources';

import {
  SkyWaitModule
} from '../wait';

import {
  SkyInfiniteScrollComponent
} from './infinite-scroll.component';
// #endregion

@NgModule({
  declarations: [
    SkyInfiniteScrollComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyWaitModule
  ],
  exports: [
    SkyInfiniteScrollComponent
  ]
})
export class SkyInfiniteScrollModule { }
