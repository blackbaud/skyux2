import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyModalAdapterService } from './modal-adapter.service';
import { SkyModalContentComponent } from './modal-content.component';
import { SkyModalFooterComponent } from './modal-footer.component';
import { SkyModalHeaderComponent } from './modal-header.component';
import { SkyModalHostComponent } from './modal-host.component';
import { SkyModalComponent } from './modal.component';
import { SkyModalService } from './modal.service';
import { SkyModalConfiguation } from './modal-configuration';

import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyModalComponent,
    SkyModalContentComponent,
    SkyModalFooterComponent,
    SkyModalHeaderComponent,
    SkyModalHostComponent
  ],
  providers: [
    SkyModalConfiguation,
    SkyModalAdapterService,
    SkyModalService
  ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkyModalComponent,
    SkyModalContentComponent,
    SkyModalFooterComponent,
    SkyModalHeaderComponent
  ],
  entryComponents: [
    SkyModalHostComponent
  ]
})
export class SkyModalModule { }
