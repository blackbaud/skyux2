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
  public title:string;
  public rows:any[] = [];
  public datepicker: SkyDatepickerCalendarInnerComponent;
  public maxMode:string;

  public constructor(datePicker: SkyDatepickerCalendarInnerComponent) {
    this.datepicker = datePicker;
  }

  public ngOnInit():void {
    let self = this;

    this.datepicker.stepMonth = {years: 1};

    this.datepicker.setRefreshViewHandler(function ():void {
      let months:any[] = new Array(12);
      let year:number = this.activeDate.getFullYear();
      let date:Date;

      for (let i = 0; i < 12; i++) {
        date = new Date(year, i, 1);
        date = this.fixTimeZone(date);
        months[i] = this.createDateObject(date, this.formatMonth);
        months[i].uid = this.uniqueId + '-' + i;
      }

      self.title = this.dateFilter(this.activeDate, this.formatMonthTitle);
      self.rows = this.split(months, self.datepicker.monthColLimit);
    }, 'month');

    this.datepicker.setCompareHandler(function (date1:Date, date2:Date):number {
      let d1 = new Date(date1.getFullYear(), date1.getMonth());
      let d2 = new Date(date2.getFullYear(), date2.getMonth());
      return d1.getTime() - d2.getTime();
    }, 'month');

    this.datepicker.refreshView();
  }
}
