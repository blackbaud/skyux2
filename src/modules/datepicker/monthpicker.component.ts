import {
  Component,
  OnInit
} from '@angular/core';
import {
  SkyDatepickerCalendarInnerComponent
} from './datepicker-calendar-inner.component';

@Component({
  selector: 'sky-monthpicker',
  templateUrl: 'monthpicker.component.html'
})
export class SkyMonthPickerComponent implements OnInit {
  public title: string;
  public rows: any[] = [];
  public datepicker: SkyDatepickerCalendarInnerComponent;
  public maxMode: string;

  public constructor(datepicker: SkyDatepickerCalendarInnerComponent) {
    this.datepicker = datepicker;
  }

  public ngOnInit(): void {

    this.datepicker.stepMonth = {
      years: 1
    };

    this.datepicker.setRefreshViewHandler(() => {
      this.refreshMonthView();
    }, 'month');

    this.datepicker.setCompareHandler(this.compareMonth, 'month');

    this.datepicker.refreshView();
  }

  private compareMonth(date1: Date, date2: Date): number {
    let d1 = new Date(date1.getFullYear(), date1.getMonth());
    let d2 = new Date(date2.getFullYear(), date2.getMonth());
    return d1.getTime() - d2.getTime();
  }

  private refreshMonthView(): void {
    let months: any[] = new Array(12);
    let year: number = this.datepicker.activeDate.getFullYear();
    let date: Date;

    for (let i = 0; i < 12; i++) {
      date = new Date(year, i, 1);
      date = this.datepicker.fixTimeZone(date);
      months[i] = this.datepicker.createDateObject(date, this.datepicker.formatMonth);
      months[i].uid = this.datepicker.datepickerId + '-' + i;
    }

    this.title =
      this.datepicker.dateFilter(this.datepicker.activeDate, this.datepicker.formatMonthTitle);
    this.rows = this.datepicker.split(months, this.datepicker.monthColLimit);
  }
}
