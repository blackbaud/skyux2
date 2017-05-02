import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkyDatepickerCalendarComponent } from './datepicker-calendar.component';
import { SkyDatepickerCalendarInnerComponent } from './datepicker-calendar-inner.component';
import { SkyDayPickerComponent } from './daypicker.component';
import { SkyMonthPickerComponent } from './monthpicker.component';
import { SkyYearPickerComponent } from './yearpicker.component';

import { SkyDatepickerComponent } from './datepicker.component';

import { SkyDatepickerConfigService } from './datepicker-config.service';
import { SkyResourcesModule } from '../resources';

import { SkyDropdownModule } from '../dropdown';

import { SkyDatepickerInputDirective } from './datepicker-input.directive';

@NgModule({
  declarations: [
    SkyDatepickerCalendarComponent,
    SkyDatepickerCalendarInnerComponent,
    SkyDayPickerComponent,
    SkyMonthPickerComponent,
    SkyYearPickerComponent,
    SkyDatepickerComponent,
    SkyDatepickerInputDirective
  ],
  imports: [
    CommonModule,
    SkyResourcesModule,
    SkyDropdownModule,
    FormsModule
  ],
  exports: [
    SkyDatepickerCalendarComponent,
    SkyDatepickerCalendarInnerComponent,
    SkyDayPickerComponent,
    SkyMonthPickerComponent,
    SkyYearPickerComponent,
    SkyDatepickerComponent,
    SkyDatepickerInputDirective
  ],
  providers: [
    SkyDatepickerConfigService
  ]
})
export class SkyDatepickerModule { }
