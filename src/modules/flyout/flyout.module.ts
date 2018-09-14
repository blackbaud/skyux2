import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';
import {
  RouterModule
} from '@angular/router';

import {
  SkyResourcesModule
} from '../resources';
import {
  SkyWindowRefService
} from '../window';
import {
  SkyIconModule
} from '../icon';

import {
  SkyFlyoutAdapterService
} from './flyout-adapter.service';
import {
  SkyFlyoutComponent
} from './flyout.component';
import {
  SkyFlyoutService
} from './flyout.service';

@NgModule({
  declarations: [
    SkyFlyoutComponent
  ],
  providers: [
    SkyFlyoutAdapterService,
    SkyFlyoutService,
    SkyWindowRefService
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SkyResourcesModule,
    SkyIconModule
  ],
  exports: [
    SkyFlyoutComponent
  ],
  entryComponents: [
    SkyFlyoutComponent
  ]
})
export class SkyFlyoutModule { }
