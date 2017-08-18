import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyRowComponent } from './row.component';
import { SkyColumnComponent } from './column.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SkyRowComponent,
    SkyColumnComponent
  ],
  exports: [
    SkyRowComponent,
    SkyColumnComponent
  ]
})
export class SkyFluidGridModule { }
