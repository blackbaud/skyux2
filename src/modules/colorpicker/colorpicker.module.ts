// spell-checker:ignore Colorpicker, Dropdown
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyDropdownModule } from '../dropdown/dropdown.module';
import { SkyResourcesModule } from '../resources';

import { SkyColorpickerComponent } from './colorpicker.component';
import { SkyColorpickerInputDirective } from './colorpicker-input.directive';
import { SkyColorpickerService } from './colorpicker.service';
import { SkyColorpickerTextDirective } from './colorpicker-text.directive';
import { SkyColorpickerSliderDirective } from './colorpicker-slider.directive';

@NgModule({
  declarations: [
    SkyColorpickerComponent,
    SkyColorpickerInputDirective,
    SkyColorpickerTextDirective,
    SkyColorpickerSliderDirective
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyDropdownModule
  ],
  exports: [
    SkyColorpickerComponent,
    SkyColorpickerInputDirective
  ],
  providers: [
    SkyColorpickerService
  ],
  entryComponents: [
    SkyColorpickerComponent
  ]
})
export class SkyColorpickerModule { }
