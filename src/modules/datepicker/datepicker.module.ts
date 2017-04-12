import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkyDatepickerCalendarComponent } from './datepicker-calendar.component';
import { SkyDatepickerCalendarInnerComponent } from './datepicker-calendar-inner.component';
import { SkyDayPickerComponent } from './daypicker.component';
import { SkyMonthPickerComponent } from './monthpicker.component';
import { SkyYearPickerComponent } from './yearpicker.component';

import { SkyDatepickerConfigService } from './datepicker-config.service';
import { SkyResourcesModule } from '../resources';

@NgModule({
  declarations: [
    SkyDatepickerCalendarComponent,
    SkyDatepickerCalendarInnerComponent,
    SkyDayPickerComponent,
    SkyMonthPickerComponent,
    SkyYearPickerComponent
  ],
  imports: [
    CommonModule,
    SkyResourcesModule
  ],
  exports: [
    SkyDatepickerCalendarComponent,
    SkyDatepickerCalendarInnerComponent,
    SkyDayPickerComponent,
    SkyMonthPickerComponent,
    SkyYearPickerComponent
  ],
  providers: [
    SkyDatepickerConfigService
  ]
})
export class SkyDatepickerModule { }
