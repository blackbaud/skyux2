import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyModalModule } from '../modal';
import { SkyResourcesModule } from '../resources';

import { SkyConfirmService } from './confirm.service';
import { SkyConfirmComponent } from './confirm.component';

@NgModule({
  declarations: [
    SkyConfirmComponent
  ],
  imports: [
    CommonModule,
    SkyModalModule,
    SkyResourcesModule
  ],
  exports: [
    SkyConfirmComponent
  ],
  providers: [
    SkyConfirmService
  ],
  entryComponents: [
    SkyConfirmComponent
  ]
})
export class SkyConfirmModule { }
