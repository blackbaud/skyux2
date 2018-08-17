import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyCheckboxLabelComponent } from './checkbox-label.component';
import { SkyCheckboxComponent } from './checkbox.component';
import { SkyResourcesModule } from '../resources';
import { SkyIconModule } from '../icon';

@NgModule({
  declarations: [
    SkyCheckboxComponent,
    SkyCheckboxLabelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SkyResourcesModule,
    SkyIconModule
  ],
  exports: [
    SkyCheckboxComponent,
    SkyCheckboxLabelComponent
  ]
})
export class SkyCheckboxModule { }
