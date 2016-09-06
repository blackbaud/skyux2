import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyCheckboxLabelComponent } from './checkbox-label.component';
import { SkyCheckboxComponent } from './checkbox.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyCheckboxComponent,
    SkyCheckboxLabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyResourcesModule
  ],
  exports: [
    SkyCheckboxComponent,
    SkyCheckboxLabelComponent
  ]
})
export class SkyCheckboxModule { }
