import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyTimePickerComponent } from './time-picker.component';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyTimePickerComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkyTimePickerComponent
  ]
})
export class SkySearchModule { }
