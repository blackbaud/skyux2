import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  SkyResourcesService
} from '../resources';
import {
  SkyWindowRefService
} from '../window';

import {
  SkyWaitComponent
} from './wait.component';
import {
  SkyWaitService
} from './wait.service';
import {
  SkyWaitPageAdapterService
} from './wait-page-adapter.service';
import {
  SkyWaitPageComponent
} from './wait-page.component';

@NgModule({
  declarations: [
    SkyWaitComponent,
    SkyWaitPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SkyWaitComponent,
    SkyWaitPageComponent
  ],
  providers: [
    SkyWaitService,
    SkyWaitPageAdapterService,
    SkyResourcesService,
    SkyWindowRefService
  ],
  entryComponents: [
    SkyWaitPageComponent
  ]
})
export class SkyWaitModule {
}
