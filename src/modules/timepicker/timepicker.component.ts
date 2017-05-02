import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { SkyDropdownModule } from '../dropdown';
import * as moment from 'moment';


@Component({
  selector: 'sky-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTimepickerComponent {

  /*@Input()
  public selectedTime: string;
*/
  @Input()
  public format: string = 'hh';


  @Output()
  public selectedTimeChanged: EventEmitter<String> = new EventEmitter<String>();
  public activeTime: String;

  private hours: Array<number> = this.setFormat(this.format).hours;
  private minutes: Array<string> = this.setFormat(this.format).minutes;
  private localeFormat: string = this.setFormat(this.format).localeFormat;
  private minuteMultiplier: number = this.setFormat(this.format).minuteMultiplier;

  public set selectedTime(newTime: String) {
    if (typeof newTime !== 'undefined') {
      this.activeTime = moment(newTime, this.localeFormat).format();
    }
  }

  public get selectedTime() {
    return moment(this.activeTime).format(this.localeFormat);
  }
  private setFormat(format: string) {
    let h: number = 12;
    let m: number = 12;
    let minuteMultiplier: number = 5;
    let localeFormat: string = 'h:mm A';
    if (format === 'hh') { h = 12; m = 12; minuteMultiplier = 5; localeFormat = 'h:mm A'; }
    if (format === 'HH') { h = 24; m = 4; minuteMultiplier = 15; localeFormat = 'HH:mm'; }
    return {
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
  }

  private set selectedHour(event: any) {
    event.stopPropagation();
    event.preventDefault();
    let element: HTMLButtonElement = <HTMLButtonElement>event.target;
    let hour: number = parseInt(element.value, 0);
    if (this.format === 'hh') {
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

  private set selectedMinute(event: any) {
    event.stopPropagation();
    event.preventDefault();
    let element: HTMLButtonElement = <HTMLButtonElement>event.target;
    let minute: number = parseInt(element.value, 0);
    this.activeTime = moment({
      'hour': moment(this.activeTime).get('hour') || 0,
      'minute': minute
    }).format();
    this.selectedTimeChanged.emit(this.selectedTime);
  }

  private set selectedMeridies(event: any) {
    event.stopPropagation();
    event.preventDefault();
    let element: HTMLButtonElement = <HTMLButtonElement>event.target;
    let meridies: string = element.value;
    if (this.format === 'hh') {
      if (meridies !== this.selectedMeridies) {
        this.activeTime = moment(this.activeTime).add(12, 'hours').format();
        this.selectedTimeChanged.emit(this.selectedTime);
      }
    }
  }

  private get selectedHour() {
    if (this.format === 'hh') {
      return parseInt(moment(this.activeTime).format('h'), 0) || 1;
    }
    if (this.format === 'HH') {
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

