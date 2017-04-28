import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyTimePickerDirective } from './time-picker.directive';
import { SkyTimePickerComponent } from './time-picker.component';
import { SkyDropdownModule } from '../dropdown/dropdown.module';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyTimePickerDirective,
    SkyTimePickerComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyDropdownModule
  ],
  exports: [
    SkyTimePickerDirective,
    SkyTimePickerComponent
  ]
})
export class SkyTimePickerModule { }
