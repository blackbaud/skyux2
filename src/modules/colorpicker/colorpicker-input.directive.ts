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
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  NG_VALIDATORS,
  AbstractControl
} from '@angular/forms';

import {
  Subscription
} from 'rxjs/Subscription';

import { SkyColorpickerService } from './colorpicker.service';
import { SkyColorpickerComponent } from './colorpicker.component';
import { SkyColorpickerHsva } from './types/colorpicker-hsva';
import { SkyColorpickerOutput } from './types/colorpicker-output';

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

@Directive({
  selector: '[skyColorpickerInput]',
  providers: [
    SKY_COLORPICKER_VALUE_ACCESSOR,
    SKY_COLORPICKER_VALIDATOR
  ]
})
export class SkyColorpickerInputDirective
  implements OnInit, OnChanges, ControlValueAccessor, Validator, OnDestroy {
  @Input()
  public skyColorpickerInput: SkyColorpickerComponent;

  @Input()
  public initialColor: string = '#FFFFFF';

  @Input()
  public returnFormat: string = 'rgba';

  @Input()
  public outputFormat: string = 'rgba';

  @Input()
  public presetColors: Array<string> = ['#333', '#888', '#EFEFEF', '#FFF'];

  @Input()
  public alphaChannel: string = 'hex6';

  public pickerChangedSubscription: Subscription;

  private firstChange = false;
  private modelValue: SkyColorpickerOutput;

  constructor(
    private element: ElementRef,
    private service: SkyColorpickerService,
    private renderer: Renderer
  ) { }

  @HostListener('input', ['$event'])
  public changeInput(event: any) {
    let value = event.target.value;
    this.skyColorpickerInput.setColorFromString(value);
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
  public onBlur /* istanbul ignore next */(event: any) {
    this._onTouched();
  }

  public ngOnInit() {
    this.renderer.setElementClass(this.element.nativeElement, 'sky-form-control', true);
    this.skyColorpickerInput.returnFormat = this.returnFormat;

    this.pickerChangedSubscription =
      this.skyColorpickerInput.selectedColorChanged
        .subscribe((newColor: SkyColorpickerOutput) => {
          if (!this.firstChange) {
            this.firstChange = true;
            this.initialColor = newColor.hex;
            this.setColorPickerDefaults();
          }

          this.writeValue(newColor);
          this._onChange(newColor);
        });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._validatorChange();
  }

  public ngOnDestroy() {
    this.pickerChangedSubscription.unsubscribe();
  }

  public setColorPickerDefaults() {
    this.skyColorpickerInput.setDialog(
      this,
      this.element,
      this.initialColor,
      this.outputFormat,
      this.presetColors,
      this.alphaChannel
    );
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

  public validate(control: AbstractControl): { [key: string]: any } {
    if (!control.value) {
      return;
    }
  }

  private writeModelValue(model: SkyColorpickerOutput) {
    if (model) {
      let setElementValue: string;
      let output: string;

      setElementValue = model.rgbaText;

      if (this.outputFormat === 'rgba') {
        output = model.rgbaText;
      }

      if (this.outputFormat === 'hsla') {
        output = model.hslaText;
      }

      if (this.outputFormat === 'cmyk') {
        output = model.cmykText;
      }

      if (this.outputFormat === 'hex') {
        output = model.hex;
      }

      this.skyColorpickerInput.setColorFromString(output);

      this.renderer.setElementStyle(
        this.element.nativeElement,
        'background-color',
        setElementValue
      );

      this.renderer.setElementStyle(this.element.nativeElement, 'color', setElementValue);
      this.renderer.setElementProperty(this.element.nativeElement, 'value', output);
      this.renderer.setElementClass(this.element.nativeElement, 'sky-colorpicker-input', true);
    }
  }

  private formatter(color: SkyColorpickerOutput) {
    if (color && typeof color !== 'string') {
      return color;
    }

    if (typeof color === 'string') {
      let formatColor: SkyColorpickerOutput;
      let hsva: SkyColorpickerHsva = this.service.stringToHsva(color, this.alphaChannel === 'hex8');

      if (!hsva) {
        hsva = this.service.stringToHsva(color, false);
      }

      formatColor = this.service.skyColorpickerOut(hsva);
      return formatColor;
    }
  }

  /*istanbul ignore next */
  private _onChange = (_: any) => { };

  /*istanbul ignore next */
  private _onTouched = () => { };
  private _validatorChange = () => { };
}
