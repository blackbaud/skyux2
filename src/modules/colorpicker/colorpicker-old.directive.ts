// spell-checker:ignore Colorpicker, Validators
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
import { SkyColorpickerWidgetComponent } from './colorpicker-widget.component';

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
import { SkyColorpickerOutput } from './colorpicker.interface';

// tslint:disable no-forward-ref
const SKY_COLORPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyColorpickerInputDirective),
  multi: true
};

const SKY_COLORPICKER_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyColorpickerInputDirective),
  multi: true
};
// tslint:enable
@Directive({
  selector: '[skyColorpickerInput]',
  providers: [
    SKY_COLORPICKER_VALUE_ACCESSOR,
    SKY_COLORPICKER_VALIDATOR
  ]
})
export class SkyColorpickerInputDirective implements
  OnInit, OnDestroy, ControlValueAccessor, Validator, OnChanges {

  public pickerChangedSubscription: Subscription;

  @Input()
  public skyColorpickerInput: SkyColorpickerWidgetComponent;

  @Input()
  public colorFormat: string;

  @Input()
  public returnFormat: string = 'rgba';

  private modelValue: SkyColorpickerOutput;
  public constructor(private renderer: Renderer, private elRef: ElementRef) {
  }

  public ngOnInit() {
    this.renderer.setElementClass(this.elRef.nativeElement, 'sky-form-control', true);
    /*
    this.pickerChangedSubscription =
      this.skyColorpickerInput.selectedColorChanged.subscribe((newColor: String) => {
        this.writeValue(this.formatter(newColor));
        this._onChange(newColor);
      });
*/
  }
  public ngOnDestroy() {
    this.pickerChangedSubscription.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges) {
    this._validatorChange();
  //  this.skyColorpickerInput.returnFormat = this.returnFormat;
  }

  @HostListener('change', ['$event'])
  public onChange(event: any) {
    //let newValue = event.target.value;
    //this.modelValue = this.formatter(newValue);
    //this._validatorChange();
    //this._onChange(this.modelValue);
    //this.writeModelValue(this.modelValue);
  }

  @HostListener('blur')
  public onBlur() {
    this._onTouched();
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }
  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }
  public registerOnValidatorChange(fn: () => void): void { this._validatorChange = fn; }

  public writeValue(value: any) {
    //this.modelValue = this.formatter(value);
    //this.writeModelValue(this.modelValue);
  }
  public validate(control: AbstractControl): { [key: string]: any } {

    let value = control.value;
    if (!value) {
      return;
    }
    /*
        if (value.local === 'Invalid date') {
          return {
            'skyColor': {
              invalid: control.value
            }
          };
        }
    */
  }
  private writeModelValue(model: SkyColorpickerOutput) {
    /*
    let setElementValue: SkyColorpickerOutput;
    if (model) {
      if (model !== model) {
        setElementValue = { hex: '' };
      } else {
        setElementValue = { hex: '' };
      }
      this.renderer.setElementProperty(this.elRef.nativeElement, 'value', setElementValue);
    }
    this.skyColorpickerInput.selectedColor = '#832383';
    */
  }

  private formatter(color: any) {
    /*
        if (typeof color === 'string') {
          let currentFormat: string;
          let formatColor: SkyColorpickerOutput;
          if (this.colorFormat === 'rgb') {
            currentFormat = 'rgb';
          }
          if (this.colorFormat === 'hex') {
            currentFormat = 'hex';
          }
          if (typeof this.returnFormat === 'undefined') { this.returnFormat = currentFormat; }
          formatColor = {
            hex: ''
          };
          return formatColor;
        }
    */
  }
  /*istanbul ignore next */
  private _onChange = (_: any) => { };
  /*istanbul ignore next */
  private _onTouched = () => { };
  private _validatorChange = () => { };

}
