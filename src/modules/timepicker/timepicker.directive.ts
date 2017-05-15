import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  forwardRef,
  HostListener,
  Renderer,
  ElementRef
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

const SKY_TIMEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyTimepickerInputDirective),
  multi: true
};

@Directive({
  selector: '[skyTimepickerInput]',
  providers: [SKY_TIMEPICKER_VALUE_ACCESSOR]
})
export class SkyTimepickerInputDirective implements OnInit, OnDestroy, ControlValueAccessor {

  public pickerChangedSubscription: Subscription;

  @Input()
  public skyTimepickerInput: SkyTimepickerComponent;

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

  private modelValue: String;
  private _onChange = (_: any) => { };
  private _onTouched = () => { };
  // private _validatorChange = () => { };

}
