import {
  Component,
  OnInit
} from '@angular/core';

import {
  SkyDatepickerCalendarInnerComponent
} from './datepicker-calendar-inner.component';

@Component({
  selector: 'sky-yearpicker',
  templateUrl: 'yearpicker.component.html'
})
export class SkyYearPickerComponent implements OnInit {
  public datepicker: SkyDatepickerCalendarInnerComponent;
  public title:string;
  public rows:any[] = [];

  public constructor(datepicker: SkyDatepickerCalendarInnerComponent) {
    this.datepicker = datepicker;
  }

  public ngOnInit():void {
    let self = this;

    this.datepicker.stepYear = {years: this.datepicker.yearRange};

    this.datepicker.setRefreshViewHandler(function ():void {
      let years:any[] = new Array(this.yearRange);
      let date:Date;
      let start = self.getStartingYear(this.activeDate.getFullYear());

      for (let i = 0; i < this.yearRange; i++) {
        date = new Date(start + i, 0, 1);
        date = this.fixTimeZone(date);
        years[i] = this.createDateObject(date, this.formatYear);
        years[i].uid = this.uniqueId + '-' + i;
      }

      self.title = [years[0].label,
        years[this.yearRange - 1].label].join(' - ');
      self.rows = this.split(years, self.datepicker.yearColLimit);
    }, 'year');

    this.datepicker.setCompareHandler(function (date1:Date, date2:Date):number {
      return date1.getFullYear() - date2.getFullYear();
    }, 'year');

    this.datepicker.refreshView();
  }

  protected getStartingYear(year:number):number {
    // todo: parseInt
    return ((year - 1) / this.datepicker.yearRange) * this.datepicker.yearRange + 1;
  }
}
