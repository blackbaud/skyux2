import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyRadioComponent } from './radio.component';
import { SkyRadioLabelComponent } from './radio-label.component';
import { SkyRadioIconComponent } from './radio-icon.component';
import { SkyIconModule } from '../icon';

@NgModule({
  declarations: [
    SkyRadioComponent,
    SkyRadioIconComponent,
    SkyRadioLabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyIconModule
  ],
  exports: [
    SkyRadioComponent,
    SkyRadioIconComponent,
    SkyRadioLabelComponent
  ]
})
export class SkyRadioModule { }
