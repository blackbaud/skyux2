import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyErrorComponent } from './error.component';
import { SkyErrorImageComponent } from './error-image.component';
import { SkyErrorTitleComponent } from './error-title.component';
import { SkyErrorDescriptionComponent } from './error-description.component';
import { SkyErrorActionComponent } from './error-action.component';

@NgModule({
  declarations: [
    SkyErrorComponent,
    SkyErrorImageComponent,
    SkyErrorTitleComponent,
    SkyErrorDescriptionComponent,
    SkyErrorActionComponent
  ],
  imports: [CommonModule],
  exports: [
    SkyErrorComponent,
    SkyErrorImageComponent,
    SkyErrorTitleComponent,
    SkyErrorDescriptionComponent,
    SkyErrorActionComponent
  ]
})
export class SkyErrorModule { }
