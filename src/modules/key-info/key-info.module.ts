import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyKeyInfoComponent } from './key-info.component';

@NgModule({
  declarations: [
    SkyKeyInfoComponent
  ],
  imports: [CommonModule],
  exports: [
    SkyKeyInfoComponent
  ]
})
export class SkyKeyInfoModule { }
