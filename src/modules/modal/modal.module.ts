import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  SkyWindowRefService
} from '../window';
import {
  SkyResourcesModule
} from '../resources';
import {
  SkyErrorModalFormComponent
} from '../error/error-modal-form.component';
import {
  SkyIconModule
} from '../icon';

import {
  SkyModalAdapterService
} from './modal-adapter.service';
import {
  SkyModalContentComponent
} from './modal-content.component';
import {
  SkyModalFooterComponent
} from './modal-footer.component';
import {
  SkyModalHeaderComponent
} from './modal-header.component';
import {
  SkyModalHostComponent
} from './modal-host.component';
import {
  SkyModalComponent
} from './modal.component';
import {
  SkyModalService
} from './modal.service';

@NgModule({
  declarations: [
    SkyModalComponent,
    SkyModalContentComponent,
    SkyModalFooterComponent,
    SkyModalHeaderComponent,
    SkyModalHostComponent,
    SkyErrorModalFormComponent
  ],
  providers: [
    SkyModalAdapterService,
    SkyModalService,
    SkyWindowRefService
  ],
  imports: [
    CommonModule,
    RouterModule,
    SkyResourcesModule,
    SkyIconModule
  ],
  exports: [
    SkyModalComponent,
    SkyModalContentComponent,
    SkyModalFooterComponent,
    SkyModalHeaderComponent
  ],
  entryComponents: [
    SkyModalHostComponent,
    SkyErrorModalFormComponent
  ]
})
export class SkyModalModule { }
