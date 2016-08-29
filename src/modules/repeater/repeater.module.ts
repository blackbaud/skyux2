import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyChevronModule } from '../chevron';
import { SkyLogModule } from '../log';

import { SkyRepeaterItemComponent } from './repeater-item.component';
import { SkyRepeaterComponent } from './repeater.component';
import { SkyRepeaterService } from './repeater.service';

@NgModule({
  declarations: [
    SkyRepeaterComponent,
    SkyRepeaterItemComponent
  ],
  providers: [
    SkyRepeaterService
  ],
  imports: [
    CommonModule,
    SkyChevronModule,
    SkyLogModule
  ],
  exports: [
    SkyRepeaterComponent,
    SkyRepeaterItemComponent
  ]
})
export class SkyRepeaterModule { }
