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

  @Input()
  public selectedTime: string;

  @Input()
  public format: string = 'hh';

  @Output()
  public selectedTimeChanged: EventEmitter<String> = new EventEmitter<String>();
  public activeTime: String;

  private hours: Array<number> = this.setFormat(this.format).hours;
  private minutes: Array<string> = this.setFormat(this.format).minutes;
  private localeFormat: string = this.setFormat(this.format).localeFormat;

  public setSelectedTime(newTime: String) {
    this.activeTime = newTime;
    console.log(this.selectedTime)
    debugger
  }

  private setFormat(format: string) {
    let h = 12;
    let m = 12;
    let minuteMultiplier = 5;
    let localeFormat = 'h:mm A';
    if (format === 'hh') { h = 12; m = 12; minuteMultiplier = 5; localeFormat = 'h:mm A'; }
    if (format === 'HH') { h = 24; m = 4; minuteMultiplier = 15; localeFormat = 'HH:mm'; }
    return {
      'hours': Array.apply(undefined, Array(h))
        .map(function (x: number, i: number) { return ++i; }),
      'minutes': Array.apply(undefined, Array(m))
        .map(function (x: number, i: number) {
          return '00'.substring(0, 2 - (i * minuteMultiplier)
            .toString().length) + (i * minuteMultiplier);
        }),
      'localeFormat': localeFormat
    };
  }

  private setHour(hour: string) {
    let target = <HTMLElement>event.currentTarget;
    this.setActive(target);

    let activeTime = moment({
      'hour': parseInt(hour, 0),
      'minute': moment(this.activeTime, this.localeFormat).get('minute') || 0
    }).format(this.localeFormat);
    this.selectedTimeChanged.emit(activeTime);
  }
  private setMinute(minute: string) {
    let target = <HTMLElement>event.currentTarget;
    this.setActive(target);
    let activeTime = moment({
      'hour': moment(this.activeTime, this.localeFormat).get('hour') || 1,
      'minute': parseInt(minute, 0)
    }).format(this.localeFormat);
    this.selectedTimeChanged.emit(activeTime);
  }

  private setPeriod(period: string) {
    let target = <HTMLElement>event.currentTarget;
    this.setActive(target);
    let activeTime = `${this.activeTime.split(' ')[0]} ${period}`;
    this.selectedTimeChanged.emit(activeTime);
  }

  private setActive(target: HTMLElement) {
    let targetParent = target.parentElement;
    event.stopPropagation();
    [].map.call(targetParent.querySelectorAll('.active'), function (el: HTMLElement) {
      el.classList.remove('active');
    });
    target.classList.add('active');
  }
}

