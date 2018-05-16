import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyRadioComponent } from './radio.component';
import { SkyRadioLabelComponent } from './radio-label.component';
import { SkyRadioGroupComponent } from './radio-group/radio-group.component';

@NgModule({
  declarations: [
    SkyRadioComponent,
    SkyRadioGroupComponent,
    SkyRadioLabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SkyRadioComponent,
    SkyRadioGroupComponent,
    SkyRadioLabelComponent
  ]
})
export class SkyRadioModule { }
