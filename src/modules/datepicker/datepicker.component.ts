import {
  Component,
  EventEmitter,
  ViewChild
} from '@angular/core';

import {
  SkyDatepickerCalendarComponent
} from './datepicker-calendar.component';

import {
  SkyDropdownComponent
} from '../dropdown';

@Component({
  selector: 'sky-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class SkyDatepickerComponent {

  public dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  public maxDate: Date;

  public minDate: Date;

  @ViewChild(SkyDatepickerCalendarComponent)
  public calendar: SkyDatepickerCalendarComponent;

  @ViewChild(SkyDropdownComponent)
  public dropdown: SkyDropdownComponent;

  public dateSelected(newDate: Date) {
    this.dateChanged.emit(newDate);
  }

  public setSelectedDate(newDate: Date) {
    this.calendar.writeValue(newDate);
  }

  public setMinDate(_minDate: Date) {
    this.minDate = _minDate;
  }

  public setMaxDate(_maxDate: Date) {
    this.maxDate = _maxDate;
  }

  public onCalendarModeChange() {
    setTimeout(() => {
      this.dropdown.resetDropdownPosition();
    });
  }

}
