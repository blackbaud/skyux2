import {
  Component,
  OnInit
} from '@angular/core';
import {
  SkyDatepickerCalendarInnerComponent
} from './datepicker-calendar-inner.component';

import {
  SkyDatepickerDate
} from './datepicker-date';

@Component({
  selector: 'sky-daypicker',
  templateUrl: 'daypicker.component.html'
})
export class SkyDayPickerComponent implements OnInit {

  public labels: any[] = [];
  public title: string;
  public rows: Array<Array<SkyDatepickerDate>> = [];
  public weekNumbers: number[] = [];
  public datepicker: SkyDatepickerCalendarInnerComponent;
  public CURRENT_THEME_TEMPLATE: any;

  public constructor(datepicker: SkyDatepickerCalendarInnerComponent) {
    this.datepicker = datepicker;
  }

  public ngOnInit(): void {

    this.datepicker.stepDay = {months: 1};

    this.datepicker.setRefreshViewHandler(() => {
      this.refreshDayView();
    }, 'day');

    this.datepicker.setCompareHandler(this.compareDays, 'day');

    this.datepicker.refreshView();
  }

  protected getDates(startDate: Date, n: number): Date[] {
    let dates: Date[] = new Array(n);
    let current = new Date(startDate.getTime());
    let i = 0;
    let date: Date;
    while (i < n) {
      date = new Date(current.getTime());
      date = this.datepicker.fixTimeZone(date);
      dates[i++] = date;
      current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
    }
    return dates;
  }

  private compareDays(date1: Date, date2: Date): number {
    let d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    let d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1.getTime() - d2.getTime();
  }

  private refreshDayView() {
    let year = this.datepicker.activeDate.getFullYear();
    let month = this.datepicker.activeDate.getMonth();
    let firstDayOfMonth = new Date(year, month, 1);
    let difference = this.datepicker.startingDay - firstDayOfMonth.getDay();
    let numDisplayedFromPreviousMonth = (difference > 0)
      ? 7 - difference
      : -difference;
    let firstDate = new Date(firstDayOfMonth.getTime());

    /* istanbul ignore else */
    /* sanity check */
    if (numDisplayedFromPreviousMonth > 0) {
      firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
    }

    // 42 is the number of days on a six-week calendar
    let days: Date[] = this.getDates(firstDate, 42);
    let pickerDates: Array<SkyDatepickerDate> = [];
    for (let i = 0; i < 42; i++) {
      let _dateObject = this.datepicker.createDateObject(
        days[i],
        this.datepicker.formatDay,
        days[i].getMonth() !== month,
        this.datepicker.datepickerId + '-' + i
      );
      pickerDates[i] = _dateObject;
    }

    this.labels = [];
    for (let j = 0; j < 7; j++) {
      this.labels[j] = {};
      this.labels[j].abbr =
        this.datepicker.dateFilter(pickerDates[j].date, this.datepicker.formatDayHeader);
      this.labels[j].full = this.datepicker.dateFilter(pickerDates[j].date, 'EEEE');
    }

    this.title =
      this.datepicker.dateFilter(this.datepicker.activeDate, this.datepicker.formatDayTitle);
    this.rows = this.datepicker.createCalendarRows(pickerDates, 7);
  }

}
