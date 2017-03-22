import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyResourcesModule } from '../resources';
import { SkyTextExpandRepeaterComponent } from './text-expand-repeater.component';

@NgModule({
  declarations: [
    SkyTextExpandRepeaterComponent
  ],
  imports: [
    SkyResourcesModule,
    CommonModule
  ],
  exports: [
    SkyTextExpandRepeaterComponent
  ]
})
export class SkyTextExpandRepeaterModule { }
