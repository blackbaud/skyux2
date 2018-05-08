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
  SkyToastService
} from './services/toast.service';
import {
  SkyToasterComponent
} from './toaster.component';
import {
  SkyToastAdapterService
} from './services/toast-adapter.service';
import {
  SkyToastComponent
} from './toast-messages';

export {
  SkyToastInstance
} from './types';
export {
  SkyToastService
};

@NgModule({
  declarations: [
    SkyToasterComponent,
    SkyToastComponent
  ],
  imports: [
    CommonModule, SkyResourcesModule
  ],
  exports: [
    SkyToasterComponent,
    SkyToastComponent
  ],
  providers: [
    SkyToastService,
    SkyToastAdapterService
  ],
  entryComponents: [
    SkyToasterComponent,
    SkyToastComponent
  ]
})
export class SkyToastModule {}
