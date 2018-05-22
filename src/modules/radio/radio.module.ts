import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyRadioComponent } from './radio.component';
import { SkyRadioLabelComponent } from './radio-label.component';
import { SkyRadioGroupComponent } from './radio-group/radio-group.component';
import { UniqueRadioSelectionService } from './unique-selection';

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
  ],
  providers: [UniqueRadioSelectionService]
})
export class SkyRadioModule { }
