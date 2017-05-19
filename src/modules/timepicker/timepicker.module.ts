import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyTimepickerInputDirective } from './timepicker.directive';
import { SkyTimepickerComponent } from './timepicker.component';
import { SkyDropdownModule } from '../dropdown/dropdown.module';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyTimepickerInputDirective,
    SkyTimepickerComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyDropdownModule
  ],
  exports: [
    SkyTimepickerInputDirective,
    SkyTimepickerComponent
  ]
})
export class SkyTimepickerModule { }
