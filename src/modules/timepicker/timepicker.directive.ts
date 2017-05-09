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
/* tslint:disable */
const SKY_TIMEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyTimepickerInputDirective),
  multi: true
};
/* tslint:enable */
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
  public format: string;

  @Input()
  public returnFormat: string;
  private modelValue: String;
  public constructor(private renderer: Renderer, private elRef: ElementRef) {
  }

  public ngOnInit() {
    this.renderer.setElementClass(this.elRef.nativeElement, 'sky-form-control', true);
    this.pickerChangedSubscription =
      this.skyTimepickerInput.selectedTimeChanged.subscribe((newTime: String) => {
        this.writeValue(newTime);
        this._onChange(newTime);
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['format']) {
      this.skyTimepickerInput.setFormat(this.format);
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
    // need to parse time here:
    this.modelValue = newValue;

    this._onChange(this.modelValue);
    this.writeModelValue(this.modelValue);
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }
  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }
  public writeValue(value: any) {
    this.modelValue = value ? value : undefined;
    this.writeModelValue(this.modelValue);
  }

  private writeModelValue(model: String) {
    if (model) {
      this.renderer.setElementProperty(this.elRef.nativeElement, 'value', model);
    }
    this.skyTimepickerInput.selectedTime = model;
  }

  private _onChange = (_: any) => { };
  private _onTouched = () => { };
  // private _validatorChange = () => { };

}
