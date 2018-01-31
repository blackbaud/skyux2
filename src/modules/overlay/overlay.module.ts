import {
  NgModule
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import { SkyOverlayComponent } from './overlay.component';
import { SkyOverlayService } from './overlay.service';

@NgModule({
  declarations: [
    SkyOverlayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyOverlayComponent
  ],
  entryComponents: [
    SkyOverlayComponent
  ],
  providers: [
    SkyOverlayService
  ]
})
export class SkyOverlayModule { }
