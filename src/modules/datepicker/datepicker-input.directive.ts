import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  forwardRef,
  Output,
  EventEmitter,
  HostListener,
  Renderer,
  ElementRef
} from '@angular/core';

import {
  SkyDatepickerComponent
} from './datepicker.component';

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

import {
  SkyDateFormatter
} from './date-formatter';

import {
  SkyDatepickerConfigService
} from './datepicker-config.service';

const SKY_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyDatepickerInputDirective),
  multi: true
};

const SKY_DATEPICKER_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyDatepickerInputDirective),
  multi: true
};

let moment = require('moment');

@Directive({
  selector: '[skyDatepickerInput]',
  providers: [
    SKY_DATEPICKER_VALUE_ACCESSOR,
    SKY_DATEPICKER_VALIDATOR
  ]
})
export class SkyDatepickerInputDirective implements
  OnInit, OnDestroy, ControlValueAccessor, Validator {

  public pickerChangedSubscription: Subscription;

  @Input()
  public skyDatepickerInput: SkyDatepickerComponent;

  @Input()
  public dateFormat: string;

  @Input()
  public skyDatepickerNoValidate: boolean = false;

  private dateFormatter = new SkyDateFormatter();

  public constructor(
    private renderer: Renderer,
    private elRef: ElementRef,
    private config: SkyDatepickerConfigService) {

    this.config = config;
    this.configureOptions();
  }

  public configureOptions(): void {
    Object.assign(this, this.config);
  }

  public ngOnInit() {
    this.renderer.setElementClass(this.elRef.nativeElement, 'sky-form-control', true);
    this.pickerChangedSubscription =
      this.skyDatepickerInput.dateChanged.subscribe((newDate: Date) => {
        this.writeValue(newDate);
        this._onChange(newDate);
      });
  }


  public ngOnDestroy() {
    if (this.pickerChangedSubscription) {
      this.pickerChangedSubscription.unsubscribe();
    }
  }

  @HostListener('change', ['$event'])
  public onChange(event: any) {
    let newValue = event.target.value;
    // need to parse date here:
    this.modelValue = this.dateFormatter.getDateFromString(newValue, this.dateFormat);
    if (this.dateFormatter.dateIsValid(this.modelValue)) {
      this._onChange(this.modelValue);
      this.writeModelValue(this.modelValue);
    } else {
      this._onChange(newValue);
    }
  }

  @HostListener('blur')
  public onBlur() {
    this._onTouched();
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  public registerOnValidatorChange(fn: () => void): void { this._validatorChange = fn; };

  public writeValue(value: any) {
    this.modelValue = value ? new Date(value) : null;
    if (this.dateFormatter.dateIsValid(this.modelValue)) {
      this.writeModelValue(this.modelValue);
    }
  }

  public validate(control: AbstractControl): {[key: string]: any} {
    let value = control.value;

    if (!value || this.skyDatepickerNoValidate) {
      return;
    }

    let dateValue = this.dateFormatter.getDateFromString(value, this.dateFormat);

    if (!this.dateFormatter.dateIsValid(dateValue)) {
      return {
        'skyDate': {
          invalid: control.value
        }
      };
    }
  }

  private writeModelValue(model: Date) {

    this.renderer.setElementProperty(
      this.elRef.nativeElement,
      'value',
      this.dateFormatter.format(model, this.dateFormat));

    this.skyDatepickerInput.setSelectedDate(model);
  }

  private modelValue: Date;

  private _onChange = (_: any) => {};
  private _onTouched = () => {};
  private _validatorChange = () => {};

}
