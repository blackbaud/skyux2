import {
  Component,
  EventEmitter,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { SkyDatepickerCalendarComponent } from './datepicker-calendar.component';

import {
  SkyDropdownComponent,
  SkyDropdownMessage,
  SkyDropdownMessageType
} from '../dropdown';

@Component({
  selector: 'sky-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class SkyDatepickerComponent implements OnDestroy {
  @ViewChild(SkyDatepickerCalendarComponent)
  public calendar: SkyDatepickerCalendarComponent;

  @ViewChild(SkyDropdownComponent)
  public dropdown: SkyDropdownComponent;

  public dropdownController = new Subject<SkyDropdownMessage>();
  public dateChanged: EventEmitter<Date> = new EventEmitter<Date>();
  public maxDate: Date;
  public minDate: Date;

  public ngOnDestroy() {
    this.dropdownController.complete();
  }

  public dateSelected(newDate: Date) {
    this.dateChanged.emit(newDate);
    this.dropdownController.next({
      type: SkyDropdownMessageType.Close
    });
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
    this.dropdownController.next({
      type: SkyDropdownMessageType.Reposition
    });
  }
}
