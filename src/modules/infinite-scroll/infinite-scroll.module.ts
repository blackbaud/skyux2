import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  SkyInfiniteScrollComponent
} from './infinite-scroll.component';
import {
  SkyInfiniteScrollDomAdapterService
} from './infinite-scroll-dom-adapter.service';

import {
  SkyResourcesModule
} from '../resources';
import {
  SkyWaitModule
} from '../wait';

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
  ],
  providers: [
    SkyInfiniteScrollDomAdapterService
  ]
})
export class SkyInfiniteScrollModule { }
