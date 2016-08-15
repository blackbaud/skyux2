import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyModalAdapterService } from './modal-adapter.service';
import { SkyModalComponent } from './modal.component';
import { SkyModalHostComponent } from './modal-host.component';
import { SkyModalService } from './modal.service';

import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyModalComponent,
    SkyModalHostComponent
  ],
  providers: [
    SkyModalAdapterService,
    SkyModalService
  ],
  imports: [CommonModule, SkyResourcesModule],
  exports: [SkyModalComponent],
  entryComponents: [
    SkyModalHostComponent
  ]
})
export class SkyModalModule { }
