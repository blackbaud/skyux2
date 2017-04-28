import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { SkyDropdownModule } from '../dropdown';
import * as moment from 'moment';


@Component({
  selector: 'sky-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTimePickerComponent implements OnChanges {

  @Input()
  public time: string;

  @Input()
  public format: string = 'hh';

  @Output()
  public currentPageChange: EventEmitter<number> = new EventEmitter<number>();

  private hours: Array<number> = this.setFormat(this.format).hours;
  private minutes: Array<string> = this.setFormat(this.format).minutes;
  private localeFormat: string = this.setFormat(this.format).localeFormat;

  public ngOnChanges(changes: SimpleChanges) {
    this.onTimePickerChanged(changes);
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

  private setHour(event: MouseEvent) {
    let target: HTMLLIElement = <HTMLLIElement>event.currentTarget;
    this.setActive(target);
    let source: HTMLInputElement = <HTMLInputElement>
      target.offsetParent.parentElement.previousElementSibling.firstElementChild;
    let sourceMinute: number = moment(source.value, this.localeFormat).get('minute') || 0;
    let targetHour: number = parseInt(target.innerHTML, 0);
    let newTime: string = moment({
      'hour': targetHour,
      'minute': sourceMinute
    }).format(this.localeFormat);
    source.value = newTime;
  }
  private setMinute(minute: string) {
    let target = <HTMLElement>event.currentTarget;
    this.setActive(target);
    let source: HTMLInputElement = <HTMLInputElement>
      target.offsetParent.parentElement.previousElementSibling.firstElementChild;
    let sourceHour: number = moment(source.value, this.localeFormat).get('hour') || 1;
    let targetMinute: number = parseInt(target.innerHTML, 0);
    let newTime: string = moment({
      'hour': sourceHour,
      'minute': targetMinute
    }).format(this.localeFormat);
    source.value = newTime;
  }

  private setPeriod(period: string) {
    let target = <HTMLElement>event.currentTarget;
    this.setActive(target);
    let source: HTMLInputElement = <HTMLInputElement>
      target.offsetParent.parentElement.previousElementSibling.firstElementChild;
    source.value = `${source.value.split(' ')[0]} ${target.innerHTML}`;
  }

  private setActive(target: HTMLElement) {
    let targetParent = target.parentElement;
    event.stopPropagation();
    [].map.call(targetParent.querySelectorAll('.active'), function (el: HTMLElement) {
      el.classList.remove('active');
    });
    target.classList.add('active');
  }
  private toggleTimePicker(event: MouseEvent) {
    let target = <HTMLElement>event.target;
    let timePicker: Element;

    if (target.className === 'sky-timepicker') {
      timePicker = target.parentElement.nextElementSibling;
    }
    if (target.className === 'sky-timepicker-button-done') {
      timePicker = target.offsetParent.parentElement;
    }
    timePicker.classList.toggle('hidden');
  }


  private onTimePickerChanged(event: any) {
      /* istanbul ignore else */
      /* sanity check */
      if (event !== event) {
        this.currentPageChange.emit(event);
      }

  }


}

