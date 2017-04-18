import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';

import { SkyDateFormatter } from './date-formatter';

let nextDatepickerId = 0;

@Component({
  selector: 'sky-datepicker-inner',
  templateUrl: './datepicker-calendar-inner.component.html',
  styleUrls: ['./datepicker-calendar-inner.component.scss']
})
export class SkyDatepickerCalendarInnerComponent implements OnInit, OnChanges {
  @Input()
  public startingDay: number;

  @Input()
  public minDate: Date;

  @Input()
  public maxDate: Date;

  @Input()
  public selectedDate: Date;

  @Output()
  public selectedDateChange: EventEmitter<Date> = new EventEmitter<Date>(undefined);

  public activeDate: Date;

  public minMode: string = 'day';
  public maxMode: string = 'year';
  public monthColLimit: number = 3;
  public yearColLimit: number = 5;
  public datepickerMode: string = 'day';
  public yearRange: number = 20;

  public formatDay: string = 'DD';
  public formatMonth: string = 'MMMM';
  public formatYear: string = 'YYYY';
  public formatDayHeader: string = 'dd';
  public formatDayTitle: string = 'MMMM YYYY';
  public formatMonthTitle: string = 'YYYY';

  public datepickerId: string = `sky-datepicker-${++nextDatepickerId}`;

  public stepDay: any = {};
  public stepMonth: any = {};
  public stepYear: any = {};

  protected modes: string[] = ['day', 'month', 'year'];
  protected dateFormatter: SkyDateFormatter = new SkyDateFormatter();
  protected activeDateId: string;

  protected refreshViewHandlerDay: Function;
  public compareHandlerDay: Function;
  protected refreshViewHandlerMonth: Function;
  protected compareHandlerMonth: Function;
  protected refreshViewHandlerYear: Function;
  protected compareHandlerYear: Function;

  public ngOnInit(): void {

    if (this.selectedDate) {
      this.activeDate = new Date(this.selectedDate);
    } else {
      this.activeDate = new Date();
    }
  }

  public ngOnChanges(): void {
    this.refreshView();
  }

  public setCompareHandler(handler: Function, type: string): void {
    if (type === 'day') {
      this.compareHandlerDay = handler;
    }

    if (type === 'month') {
      this.compareHandlerMonth = handler;
    }

    if (type === 'year') {
      this.compareHandlerYear = handler;
    }
  }

  public compare(date1: Date, date2: Date): number | undefined {
    if (date1 === undefined || date2 === undefined) {
      return undefined;
    }

    if (this.datepickerMode === 'day' && this.compareHandlerDay) {
      return this.compareHandlerDay(date1, date2);
    }

    if (this.datepickerMode === 'month' && this.compareHandlerMonth) {
      return this.compareHandlerMonth(date1, date2);
    }

    if (this.datepickerMode === 'year' && this.compareHandlerYear) {
      return this.compareHandlerYear(date1, date2);
    }

    return void 0;
  }

  public setRefreshViewHandler(handler: Function, type: string): void {
    if (type === 'day') {
      this.refreshViewHandlerDay = handler;
    }

    if (type === 'month') {
      this.refreshViewHandlerMonth = handler;
    }

    if (type === 'year') {
      this.refreshViewHandlerYear = handler;
    }
  }

  public refreshView(): void {
    if (this.datepickerMode === 'day' && this.refreshViewHandlerDay) {
      this.refreshViewHandlerDay();
    }

    if (this.datepickerMode === 'month' && this.refreshViewHandlerMonth) {
      this.refreshViewHandlerMonth();
    }

    if (this.datepickerMode === 'year' && this.refreshViewHandlerYear) {
      this.refreshViewHandlerYear();
    }
  }

  public dateFilter(date: Date, format: string): string {
    return this.dateFormatter.format(date, format);
  }

  public isActive(dateObject: any): boolean {
    if (this.compare(dateObject.date, this.activeDate) === 0) {
      this.activeDateId = dateObject.uid;
      return true;
    }

    return false;
  }

  /*
      dateObject should probably be it's own class. split, dateFilter, and isActive might be
      good to have in some sort of utils service
  */

  public createDateObject(date: Date, format: string): any {
    let dateObject: any = {};
    dateObject.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    dateObject.label = this.dateFilter(date, format);
    dateObject.selected = this.compare(date, this.selectedDate) === 0;
    dateObject.disabled = this.isDisabled(date);
    dateObject.current = this.compare(date, new Date()) === 0;
    return dateObject;
  }

  public split(arr: any[], size: number): any[] {
    let arrays: any[] = [];
    while (arr.length > 0) {
      arrays.push(arr.splice(0, size));
    }
    return arrays;
  }

  /*
    This is ensures that no strangeness happens when converting a date to local time.
  */
  public fixTimeZone(date: Date): Date {
    let newDate = new Date(date);
    newDate.setFullYear(
      date.getFullYear(),
      date.getMonth(),
      date.getDate());

    return newDate;
  }

  public select(date: Date, isManual: boolean = true): void {

    this.activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    /*
        Only actually select date if in minmode (day picker mode).
        Otherwise, just change the active view for the datepicker.
    */
    if (this.datepickerMode === this.minMode) {
      this.selectedDate = new Date(this.activeDate);
      if (isManual) {
        this.selectedDateChange.emit(this.selectedDate);
      }

    } else {
      this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) - 1];
    }

    this.refreshView();
  }

  public move(direction: number): void {
    let expectedStep: any;
    if (this.datepickerMode === 'day') {
      expectedStep = this.stepDay;
    }

    if (this.datepickerMode === 'month') {
      expectedStep = this.stepMonth;
    }

    if (this.datepickerMode === 'year') {
      expectedStep = this.stepYear;
    }

    if (expectedStep) {
      let year = this.activeDate.getFullYear() + (direction * (expectedStep.years || 0));
      let month = this.activeDate.getMonth() + (direction * (expectedStep.months || 0));

      this.activeDate = new Date(year, month, 1);

      this.refreshView();
    }
  }

  public toggleMode(direction: number): void {
    direction = direction || 1;

    if ((this.datepickerMode === this.maxMode && direction === 1) ||
      (this.datepickerMode === this.minMode && direction === -1)) {
      return;
    }

    this.datepickerMode = this.modes[this.modes.indexOf(this.datepickerMode) + direction];
    this.refreshView();
  }

  protected isDisabled(date: Date): boolean {

    return ((this.minDate && this.compare(date, this.minDate) < 0)
      || (this.maxDate && this.compare(date, this.maxDate) > 0));
  }
}
