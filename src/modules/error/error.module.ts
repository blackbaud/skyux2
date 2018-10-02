import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyErrorComponent } from './error.component';
import { SkyErrorImageComponent } from './error-image.component';
import { SkyErrorTitleComponent } from './error-title.component';
import { SkyErrorDescriptionComponent } from './error-description.component';
import { SkyErrorActionComponent } from './error-action.component';

import { SkyResourcesModule } from '../resources';
import { SkyErrorModalService } from './error-modal.service';
import { SkyErrorModalFormComponent } from './error-modal-form.component';
import { SkyModalModule } from '../modal';

@NgModule({
  declarations: [
    SkyErrorComponent,
    SkyErrorImageComponent,
    SkyErrorTitleComponent,
    SkyErrorDescriptionComponent,
    SkyErrorActionComponent,
    SkyErrorModalFormComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyModalModule
  ],
  exports: [
    SkyErrorComponent,
    SkyErrorImageComponent,
    SkyErrorTitleComponent,
    SkyErrorDescriptionComponent,
    SkyErrorActionComponent,
    SkyErrorModalFormComponent
  ],
  providers: [
    SkyErrorModalService
  ],
  entryComponents: [
    SkyErrorModalFormComponent
  ]
})
export class SkyErrorModule { }
