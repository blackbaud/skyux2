// spell-checker:ignore Colorpicker, Dropdown
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyDropdownModule } from '../dropdown/dropdown.module';
import { SkyResourcesModule } from '../resources';

import { SkyColorpickerComponent } from './colorpicker.component';
import { SkyColorpickerWidgetComponent } from './colorpicker-widget.component';
import { SkyColorpickerWidgetDirective } from './colorpicker-widget.directive';
import { SkyColorpickerWidgetService } from './colorpicker-widget.service';
import { SkyColorpickerTextDirective } from './colorpicker-text.directive';
import { SkyColorpickerSliderDirective } from './colorpicker-slider.directive';

@NgModule({
  declarations: [
    SkyColorpickerComponent,
    SkyColorpickerWidgetComponent,
    SkyColorpickerWidgetDirective,
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
    SkyColorpickerWidgetComponent
  ],
  providers: [
    SkyColorpickerWidgetService
  ],
  entryComponents: [
    SkyColorpickerWidgetComponent
  ]
})
export class SkyColorpickerModule { }
