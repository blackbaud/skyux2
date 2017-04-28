import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {
  SkyDatepickerCalendarInnerComponent
} from './datepicker-calendar-inner.component';
import {
  SkyDatepickerConfigService
} from './datepicker-config.service';
import {
  SkyDatepickerCalendarComponent
} from './datepicker-calendar.component';
@Component({
  selector: 'sky-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class SkyDatepickerComponent {

  public dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  @ViewChild(SkyDatepickerCalendarComponent)
  public calendar: SkyDatepickerCalendarComponent;

  public dateSelected(newDate: Date) {
    this.dateChanged.emit(newDate);
  }

  public setSelectedDate(newDate: Date) {
    this.calendar.writeValue(newDate);
  }

}
