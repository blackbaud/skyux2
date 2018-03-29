import {
  ElementRef,
  Directive,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer,
  SimpleChanges,
  OnDestroy
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator
} from '@angular/forms';

import { SkyColorpickerService } from './colorpicker.service';
import { SkyColorpickerComponent } from './colorpicker.component';

import {
  SkyColorpickerHsva,
  SkyColorpickerOutput
} from './types';

import { Subscription } from 'rxjs/Subscription';

// tslint:disable:no-forward-ref no-use-before-declare
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

const SKY_COLORPICKER_DEFAULT_COLOR = '#FFFFFF';

@Directive({
  selector: '[skyColorpickerInput]',
  providers: [
    SKY_COLORPICKER_VALUE_ACCESSOR,
    SKY_COLORPICKER_VALIDATOR
  ]
})
export class SkyColorpickerInputDirective
  implements OnInit, OnChanges, ControlValueAccessor, Validator, OnDestroy {

  public pickerChangedSubscription: Subscription;

  @Input()
  public skyColorpickerInput: SkyColorpickerComponent;

  @Input()
  public set initialColor(value: string) {
    this._initialColor = value || SKY_COLORPICKER_DEFAULT_COLOR;
  }

  public get initialColor(): string {
    return this._initialColor;
  }

  @Input()
  public returnFormat = 'rgba';

  @Input()
  public outputFormat = 'rgba';

  @Input()
  public presetColors = ['#333', '#888', '#EFEFEF', '#FFF'];

  @Input()
  public alphaChannel = 'hex6';

  private _initialColor = SKY_COLORPICKER_DEFAULT_COLOR;
  private modelValue: SkyColorpickerOutput;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private service: SkyColorpickerService
  ) { }

  @HostListener('input', ['$event'])
  public changeInput(event: any) {
    const value = event.target.value;
    this.skyColorpickerInput.setColorFromString(value);
  }

  @HostListener('change', ['$event'])
  public onChange(event: any) {
    const newValue = event.target.value;
    this.modelValue = this.formatter(newValue);
    this._validatorChange();
    this._onChange(this.modelValue);
    this.writeModelValue(this.modelValue);
  }

  @HostListener('blur')
  public onBlur(event: any) {
    this._onTouched();
  }

  public ngOnInit() {
    const element = this.elementRef.nativeElement;

    this.renderer.setElementClass(element, 'sky-form-control', true);
    this.skyColorpickerInput.initialColor = this.initialColor;
    this.skyColorpickerInput.returnFormat = this.returnFormat;

    this.pickerChangedSubscription =
      this.skyColorpickerInput.selectedColorChanged.subscribe((newColor: SkyColorpickerOutput) => {
        this.writeValue(newColor);
        this._onChange(newColor);
      });

      this.skyColorpickerInput.setColorFromString(this.initialColor);

    const typeAttr = element.getAttribute('type');
    if (typeAttr && typeAttr === 'hidden') {
      this.skyColorpickerInput.isVisible = false;
    } else {
      this.skyColorpickerInput.isVisible = true;
    }
  }

  public ngOnDestroy() {
    this.pickerChangedSubscription.unsubscribe();
  }

  public setColorPickerDefaults() {
    this.skyColorpickerInput.setDialog(
      this,
      this.elementRef,
      this.initialColor,
      this.outputFormat,
      this.presetColors,
      this.alphaChannel
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._validatorChange();
    this.skyColorpickerInput.returnFormat = this.returnFormat;
    this.setColorPickerDefaults();
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }
  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }
  public registerOnValidatorChange(fn: () => void): void { this._validatorChange = fn; }

  public writeValue(value: any) {
    if (value) {
      this.modelValue = this.formatter(value);
      this.writeModelValue(this.modelValue);
    }
  }

  public validate(control: AbstractControl): {[key: string]: any} {
    let value = control.value;
    if (!value) {
      return;
    }
    // Validation
  }

  private writeModelValue(model: SkyColorpickerOutput) {
    const setElementValue = model.rgbaText;
    const element = this.elementRef.nativeElement;

    let output: string;
    // tslint:disable-next-line:switch-default
    switch (this.outputFormat) {
      case 'rgba':
      output = model.rgbaText;
      break;

      case 'hsla':
      output = model.hslaText;
      break;

      case 'cmyk':
      output = model.cmykText;
      break;

      case 'hex':
      output = model.hex;
      break;
    }

    this.skyColorpickerInput.setColorFromString(output);

    this.renderer.setElementStyle(element, 'background-color', setElementValue);
    this.renderer.setElementStyle(element, 'color', setElementValue);
    this.renderer.setElementProperty(element, 'value', output);
    this.renderer.setElementClass(element, 'sky-colorpicker-input', true);
  }

  private formatter(color: any) {
    if (color && typeof color !== 'string') {
      return color;
    }

    let formatColor: SkyColorpickerOutput;
    let hsva: SkyColorpickerHsva = this.service.stringToHsva(color, this.alphaChannel === 'hex8');

    formatColor = this.service.skyColorpickerOut(hsva);

    return formatColor;
  }

  /*istanbul ignore next */
  private _onChange = (_: any) => { };
  /*istanbul ignore next */
  private _onTouched = () => { };
  private _validatorChange = () => { };
}
