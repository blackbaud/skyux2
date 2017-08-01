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
  NG_VALUE_ACCESSOR,
  Validator,
  NG_VALIDATORS,
  AbstractControl
} from '@angular/forms';

import {
  Subscription
} from 'rxjs/Subscription';
import { SkyTimepickerTimeOutput } from './timepicker.interface';

// tslint:disable:no-forward-ref no-use-before-declare
const SKY_TIMEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyTimepickerInputDirective),
  multi: true
};

const SKY_TIMEPICKER_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyTimepickerInputDirective),
  multi: true
};
// tslint:enable
@Directive({
  selector: '[skyTimepickerInput]',
  providers: [
    SKY_TIMEPICKER_VALUE_ACCESSOR,
    SKY_TIMEPICKER_VALIDATOR
  ]
})
export class SkyTimepickerInputDirective implements
  OnInit, OnDestroy, ControlValueAccessor, Validator, OnChanges {

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
  public ngOnDestroy() {
    this.pickerChangedSubscription.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges) {
    this._validatorChange();
    this.skyTimepickerInput.setFormat(this.timeFormat);
    this.skyTimepickerInput.returnFormat = this.returnFormat;
  }

  @HostListener('change', ['$event'])
  public onChange(event: any) {
    let newValue = event.target.value;
    this.modelValue = this.formatter(newValue);
    this._validatorChange();
    this._onChange(this.modelValue);
    this.writeModelValue(this.modelValue);
  }

  @HostListener('blur')
  public onBlur /* istanbul ignore next */ () {
    this._onTouched();
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }
  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }
  public registerOnValidatorChange(fn: () => void): void { this._validatorChange = fn; }

  public writeValue(value: any) {
    this.modelValue = this.formatter(value);
    this.writeModelValue(this.modelValue);
  }
  public validate(control: AbstractControl): { [key: string]: any } {
    let value = control.value;
    if (!value) {
      return undefined;
    }

    /* istanbul ignore next */
    if (value.local === 'Invalid date') {
      return {
        'skyTime': {
          invalid: control.value
        }
      };
    }

    return undefined;
  }
  private writeModelValue(model: SkyTimepickerTimeOutput) {
    let setElementValue: string;
    if (model) {
      /* istanbul ignore next */
      if (moment(model).format(model.customFormat) === 'Invalid date') {
        setElementValue = '';
      } else {
        setElementValue = moment(model).format(model.customFormat);
      }
      this.renderer.setElementProperty(this.elRef.nativeElement, 'value', setElementValue);
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
        'iso8601': moment(time, currentFormat).format(),
        'local': moment(time, currentFormat).format(currentFormat),
        'customFormat': this.returnFormat
      };
      return formatTime;
    }
  }
  /*istanbul ignore next */
  private _onChange = (_: any) => { };
  /*istanbul ignore next */
  private _onTouched = () => { };
  private _validatorChange = () => { };

}
