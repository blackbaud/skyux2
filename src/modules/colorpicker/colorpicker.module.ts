// spell-checker:ignore Colorpicker, Dropdown
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyResourcesModule } from '../resources';

import { SkyColorpickerComponent } from './colorpicker.component';
import { SkyColorpickerInputDirective } from './colorpicker-input.directive';
import { SkyColorpickerService } from './colorpicker.service';
import { SkyColorpickerTextDirective } from './colorpicker-text.directive';
import { SkyColorpickerSliderDirective } from './colorpicker-slider.directive';
import { SkyPopoverModule } from '../popover';

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
    SkyPopoverModule
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
