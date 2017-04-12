import {
  Component,
  OnInit
} from '@angular/core';
import {
  SkyDatepickerCalendarInnerComponent
} from './datepicker-calendar-inner.component';

@Component({
  selector: 'sky-daypicker',
  templateUrl: 'daypicker.component.html'
})
export class SkyDayPickerComponent implements OnInit {

  public labels: any[] = [];
  public title: string;
  public rows: any[] = [];
  public weekNumbers: number[] = [];
  public datepicker: SkyDatepickerCalendarInnerComponent;
  public CURRENT_THEME_TEMPLATE: any;

  public constructor(datepicker: SkyDatepickerCalendarInnerComponent) {
    this.datepicker = datepicker;
  }

  public ngOnInit(): void {
    let self = this;

    this.datepicker.stepDay = {months: 1};

    this.datepicker.setRefreshViewHandler(function (): void {
      let year = this.activeDate.getFullYear();
      let month = this.activeDate.getMonth();
      let firstDayOfMonth = new Date(year, month, 1);
      let difference = this.startingDay - firstDayOfMonth.getDay();
      let numDisplayedFromPreviousMonth = (difference > 0)
        ? 7 - difference
        : -difference;
      let firstDate = new Date(firstDayOfMonth.getTime());

      if (numDisplayedFromPreviousMonth > 0) {
        firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
      }

      // 42 is the number of days on a six-week calendar
      let _days: Date[] = self.getDates(firstDate, 42);
      let days: any[] = [];
      for (let i = 0; i < 42; i++) {
        let _dateObject = this.createDateObject(_days[i], this.formatDay);
        _dateObject.secondary = _days[i].getMonth() !== month;
        _dateObject.uid = this.uniqueId + '-' + i;
        days[i] = _dateObject;
      }

      self.labels = [];
      for (let j = 0; j < 7; j++) {
        self.labels[j] = {};
        self.labels[j].abbr = this.dateFilter(days[j].date, this.formatDayHeader);
        self.labels[j].full = this.dateFilter(days[j].date, 'EEEE');
      }

      self.title = this.dateFilter(this.activeDate, this.formatDayTitle);
      self.rows = this.split(days, 7);
    }, 'day');

    this.datepicker.setCompareHandler(function (date1: Date, date2: Date): number {
      let d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      let d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      return d1.getTime() - d2.getTime();
    }, 'day');

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
}
