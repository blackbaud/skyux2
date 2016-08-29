import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyCheckboxComponent } from './checkbox.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [SkyCheckboxComponent],
  imports: [CommonModule, FormsModule, SkyResourcesModule],
  exports: [SkyCheckboxComponent]
})
export class SkyCheckboxModule { }
