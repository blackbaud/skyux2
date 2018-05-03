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
  SkyResourcesModule
} from '../resources';
import {
  SkyWaitModule
} from '../wait';
import {
  SkyInfiniteScrollDomAdapterService
} from './infinite-scroll-dom-adapter.service';

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
