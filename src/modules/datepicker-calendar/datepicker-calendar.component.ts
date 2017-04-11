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
  SkyDatepickerConfig
} from './datepicker.config';

/* tslint:disable:component-selector-name component-selector-type */
@Component({
  selector: 'sky-datepicker',
  templateUrl: './datepicker-calendar.component.html'
})
export class SkyDatepickerComponent {
  /** sets datepicker mode, supports: `day`, `month`, `year` */
  @Input()
  public datepickerMode: string = 'day';
  /** default date to show if `ng-model` value is not specified */
  @Input()
  public initDate: Date;
  /**  oldest selectable date */
  @Input()
  public minDate: Date;
  /** latest selectable date */
  @Input()
  public maxDate: Date;
  /** format of day in month */
  @Input()
  public formatDay: string;
  /** format of month in year */
  @Input()
  public formatMonth: string;
  /** format of year in year range */
  @Input()
  public formatYear: string;
  /** array of disabled dates */
  @Input()
  public dateDisabled: { date: Date, mode: string }[];
  /** starting day of the week from 0-6 (0=Sunday, ..., 6=Saturday) */
  @Input()
  public startingDay: number;

  /** currently active date */
  @Input()
  public get activeDate(): Date {
    return this._activeDate || this._now;
  }

  public set activeDate(value: Date) {
    this._activeDate = value;
  }

  @Output()
  public selectionDone: EventEmitter<Date> = new EventEmitter<Date>(undefined);

  @Output()
  public activeDateChange: EventEmitter<Date> = new EventEmitter<Date>(undefined);

  @ViewChild(SkyDatepickerCalendarInnerComponent)
  public _datepicker: SkyDatepickerCalendarInnerComponent;

  public minMode: string;
  public maxMode: string;
  public monthColLimit: number;
  public yearColLimit: number;

  protected _now: Date = new Date();
  protected _activeDate: Date;
  protected config: SkyDatepickerConfig;

  public constructor(config: SkyDatepickerConfig) {
    this.config = config;
    this.configureOptions();
  }

  public configureOptions(): void {
    Object.assign(this, this.config);
  }

  public onActiveDateChange(event: Date): void {
    this.activeDateChange.emit(event);
  }

  public writeValue(value: any): void {
    if (this._datepicker.compare(value, this._activeDate) === 0) {
      return;
    }
    if (value && value instanceof Date) {
      this.activeDate = value;
      this._datepicker.select(value);
      return;
    }

    this.activeDate = value ? new Date(value) : void 0;
  }
}
