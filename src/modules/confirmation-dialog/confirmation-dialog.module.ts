import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyConfirmationDialogService } from './confirmation-dialog.service';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [],
  providers: [
    SkyConfirmationDialogService
  ],
  entryComponents: []
})
export class SkyConfirmationDialogModule { }
