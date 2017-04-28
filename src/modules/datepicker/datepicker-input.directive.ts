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
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import {
  Subscription
} from 'rxjs/Subscription';

const SKY_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyDatepickerInputDirective),
  multi: true
};

@Directive({
  selector: '[skyDatepickerInput]',
  providers: [SKY_DATEPICKER_VALUE_ACCESSOR]
})
export class SkyDatepickerInputDirective implements OnInit, OnDestroy, ControlValueAccessor {

  public pickerChangedSubscription: Subscription;

  @Input()
  public skyDatepickerInput: SkyDatepickerComponent;

  public constructor(private renderer: Renderer, private elRef: ElementRef) {
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
    this.modelValue = new Date(newValue);

    this._onChange(this.modelValue);
    this.writeModelValue(this.modelValue);
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  public writeValue(value: any) {
    this.modelValue = value ? new Date(value) : null;
    this.writeModelValue(this.modelValue);
  }

  private writeModelValue(model: Date) {
    if (model) {
      this.renderer.setElementProperty(this.elRef.nativeElement, 'value', model.toISOString());
    }

    this.skyDatepickerInput.setSelectedDate(model);
  }

  private modelValue: Date;

  private _onChange = (_: any) => {};
  private _onTouched = () => {};
  private _validatorChange = () => {};

}
