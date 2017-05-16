import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  forwardRef,
  HostListener,
  Renderer,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
let moment = require('moment');
import {
  SkyTimepickerComponent
} from './timepicker.component';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import {
  Subscription
} from 'rxjs/Subscription';
import { SkyTimepickerTimeOutput } from './timepicker.interface';

// tslint:disable no-forward-ref
const SKY_TIMEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyTimepickerInputDirective),
  multi: true
};
// tslint:enable
@Directive({
  selector: '[skyTimepickerInput]',
  providers: [SKY_TIMEPICKER_VALUE_ACCESSOR]
})
export class SkyTimepickerInputDirective implements
  OnInit, OnDestroy, ControlValueAccessor, OnChanges {

  public pickerChangedSubscription: Subscription;

  @Input()
  public skyTimepickerInput: SkyTimepickerComponent;

  @Input()
  public timeFormat: string;

  @Input()
  public returnFormat: string;
  private modelValue: SkyTimepickerTimeOutput;
  public constructor(private renderer: Renderer, private elRef: ElementRef) {
  }

  public ngOnInit() {
    this.renderer.setElementClass(this.elRef.nativeElement, 'sky-form-control', true);
    this.pickerChangedSubscription =
      this.skyTimepickerInput.selectedTimeChanged.subscribe((newTime: String) => {
        this.writeValue(this.formatter(newTime));
        this._onChange(newTime);
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['timeFormat']) {
      this.skyTimepickerInput.setFormat(this.timeFormat);
    }
    if (changes['returnFormat']) {
      this.skyTimepickerInput.returnFormat = this.returnFormat;
    }
  }
  public ngOnDestroy() {
    if (this.pickerChangedSubscription) {
      this.pickerChangedSubscription.unsubscribe();
    }
  }

  @HostListener('change', ['$event'])
  public onChange(event: any) {
    let newValue = event.target.value;
    this.modelValue = this.formatter(newValue);
    this._onChange(this.modelValue);
    this.writeModelValue(this.modelValue);
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }
  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }
  public writeValue(value: any) {
    this.modelValue = this.formatter(value);
    this.writeModelValue(this.modelValue);
  }

  private writeModelValue(model: SkyTimepickerTimeOutput) {
    if (model) {
      this.renderer.setElementProperty(this.elRef.nativeElement, 'value',
        moment(model).format(model.customFormat)
      );
    }
    this.skyTimepickerInput.selectedTime = model;
  }

  private formatter(time: any) {
    if (time && typeof time !== 'string' && 'local' in time) { return time; }
    if (typeof time === 'string') {
      let currentFormat: string;
      let formatTime: SkyTimepickerTimeOutput;
      if (this.timeFormat === 'hh') {
        currentFormat = 'h:mm A';
      }
      if (this.timeFormat === 'HH') {
        currentFormat = 'H:mm';
      }
      if (typeof this.returnFormat === 'undefined') { this.returnFormat = currentFormat; }
      formatTime = {
        'hour': moment(time, currentFormat).hour(),
        'minute': moment(time, currentFormat).minute(),
        'meridie': moment(time, currentFormat).format('A'),
        'timezone': moment(time, currentFormat).format('Z'),
        'ios8601': moment(time, currentFormat).format(),
        'local': moment(time, currentFormat).format(currentFormat),
        'customFormat': this.returnFormat
      };
      return formatTime;
    }
  }
  private _onChange = (_: any) => { };
  private _onTouched = () => { };
  // private _validatorChange = () => { };

}
