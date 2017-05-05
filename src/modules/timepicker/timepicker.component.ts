import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { SkyDropdownModule } from '../dropdown';
let moment = require('moment');

@Component({
  selector: 'sky-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTimepickerComponent implements OnInit {

  @Input()
  public format: string;

  @Input()
  public returnFormat: string;

  @Output()
  public selectedTimeChanged: EventEmitter<String> = new EventEmitter<String>();

  @Output()
  public activeTime: String;

  public hours: Array<number>;
  public minutes: Array<number>;
  public localeFormat: string;
  public minuteMultiplier: number;
  private is8601: boolean = false;

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    if (event.target.className === 'active') {
      event.stopPropagation();
    }
  }

  public ngOnInit() {
    this.setFormat(this.format);
  }

  public setFormat(format: string) {
    let h: number = 12;
    let m: number = 12;
    let minuteMultiplier: number = 5;
    let localeFormat: string = 'h:mm A';
    if (format === 'hh') { h = 12; m = 12; minuteMultiplier = 5; localeFormat = 'h:mm A'; }
    if (format === 'HH') {
      h = 24;
      m = 4;
      minuteMultiplier = 15;
      localeFormat = 'HH:mm';
      this.is8601 = true;
    }
    let data: {
      'hours': Array<number>,
      'minutes': Array<number>,
      'localeFormat': string,
      'minuteMultiplier': number
    };

    data = {
      'hours': Array.apply(undefined, Array(h))
        .map(function (x: number, i: number) {
          if (format === 'hh') { return ++i; }
          if (format === 'HH') { return i; }
        }),
      'minutes': Array.apply(undefined, Array(m))
        .map(function (x: number, i: number) {
          return i * minuteMultiplier;
        }),
      'localeFormat': localeFormat,
      'minuteMultiplier': minuteMultiplier
    };

    this.hours = data.hours;
    this.minutes = data.minutes;
    this.localeFormat = data.localeFormat;
    this.minuteMultiplier = data.minuteMultiplier;
  }


  public set selectedTime(newTime: String) {
    if (typeof newTime !== 'undefined') {
      this.activeTime = moment(newTime, this.localeFormat).format();
    }
  }
  public get selectedTime() {
    if (typeof this.returnFormat !== 'undefined') {
      return moment(this.activeTime).format(this.returnFormat);
    } else {
      return moment(this.activeTime).format(this.localeFormat);
    }
  }




  private set selectedHour(hour: number) {
    if (!this.is8601) {
      if (this.selectedMeridies === 'PM') {
        if (hour !== 12) {
          hour = moment({ 'hour': hour }).add(12, 'hours').hour();
        }
      }
      if (this.selectedMeridies === 'AM') {
        if (hour === 12) {
          hour = moment({ 'hour': 0 }).hour();
        }
      }
    }
    this.activeTime = moment({
      'hour': hour,
      'minute': moment(this.activeTime).get('minute') || 0
    }).format();
    this.selectedTimeChanged.emit(this.selectedTime);
  }

  private set selectedMinute(minute: number) {
    this.activeTime = moment({
      'hour': moment(this.activeTime).get('hour') || 0,
      'minute': minute
    }).format();
    this.selectedTimeChanged.emit(this.selectedTime);
  }

  private set selectedMeridies(meridies: string) {
    if (!this.is8601) {
      if (meridies !== this.selectedMeridies) {
        this.activeTime = moment(this.activeTime).add(12, 'hours').format();
        this.selectedTimeChanged.emit(this.selectedTime);
      }
    }
  }

  private get selectedHour() {
    if (!this.is8601) {
      return parseInt(moment(this.activeTime).format('h'), 0) || 1;
    }
    if (this.is8601) {
      return moment(this.activeTime).hour() || 0;
    }

  }
  private get selectedMinute() {
    return moment(this.activeTime).minute() || 0;
  }

  private get selectedMeridies() {
    if (this.activeTime) {
      return moment(this.activeTime).format('A');
    }
  }
}

