import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  SkyWindowRefService
} from '../window';

import {
  SkyOverlayDomAdapterService
} from './overlay-dom-adapter.service';

import {
  SkyOverlayComponent
} from './overlay.component';

import {
  SkyOverlayService
} from './overlay.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SkyOverlayComponent
  ],
  entryComponents: [
    SkyOverlayComponent
  ],
  providers: [
    SkyOverlayDomAdapterService,
    SkyOverlayService,
    SkyWindowRefService
  ]
})
export class OverlayModule { }
