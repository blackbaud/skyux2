import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyModalModule } from '../modal';

import { SkyConfirmationDialogService } from './confirmation-dialog.service';
import { SkyConfirmationDialogComponent } from './confirmation-dialog.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    SkyModalModule,
    SkyResourcesModule
  ],
  exports: [
    SkyConfirmationDialogComponent
  ],
  providers: [
    SkyConfirmationDialogService
  ],
  entryComponents: [
    SkyConfirmationDialogComponent
  ]
})
export class SkyConfirmationDialogModule { }
