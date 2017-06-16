// spell-checker:ignore Colorpicker, Validators, hsva
import {
  ElementRef,
  ViewContainerRef,
  EventEmitter,
  Directive,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer,
  SimpleChanges
} from '@angular/core';
import { SkyColorpickerWidgetService } from './colorpicker-widget.service';
import { SkyColorpickerWidgetComponent } from './colorpicker-widget.component';
import { SkyColorpickerOutput } from './colorpicker.interface';
import { SliderPosition, SliderDimension } from './colorpicker-classes';

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

// tslint:disable no-forward-ref
const SKY_COLORPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyColorpickerWidgetDirective),
  multi: true
};

const SKY_COLORPICKER_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkyColorpickerWidgetDirective),
  multi: true
};
// tslint:enable
@Directive({
  selector: '[skyColorpicker]',
  providers: [
    SKY_COLORPICKER_VALUE_ACCESSOR,
    SKY_COLORPICKER_VALIDATOR
  ]
})
export class SkyColorpickerWidgetDirective
  implements OnInit, OnChanges, ControlValueAccessor, Validator {

  public pickerChangedSubscription: Subscription;

  @Input()
  public skyColorpickerInput: SkyColorpickerWidgetComponent;

  @Input()
  public initialColor: string = '#fff';

  @Input()
  public returnFormat: string = 'rgba';

  @Input('skyColorpicker')
  public skyColorpicker: string = '#456f23';

  @Output('colorPickerSelect')
  public colorPickerSelect = new EventEmitter<string>(true);

  @Output('colorPickerChange')
  public colorPickerChange = new EventEmitter<string>(false);
  /*
    @Output('cpInputChange')
    public cpInputChange = new EventEmitter<any>(true);
  */
  /*
    @Output('cpSliderChange')
    public cpSliderChange = new EventEmitter<any>(true);
  */
  @Input('outputFormat')
  public outputFormat: string = 'hex';
  @Input('presetColors')
  public presetColors: Array<string>;
  @Input('alphaChannel')
  public alphaChannel: string = 'hex6';

private colorFormat: string;
  private dialog: any;
  private created: boolean;

  private modelValue: SkyColorpickerOutput;
  constructor(
    private vcRef: ViewContainerRef,
    private el: ElementRef,
    private service: SkyColorpickerWidgetService,
    private renderer: Renderer
  ) {
    this.created = false;
  }

  @HostListener('input', ['$event'])
  public changeInput(event: any) {
    let value = event.target.value;
    this.dialog.setColorFromString(value, true);
  }


  public ngOnChanges(changes: any): void {
    this._validatorChange();
    this.skyColorpickerInput.returnFormat = this.returnFormat;
    this.openDialog();

    if (changes.skyColorpicker) {
      if (this.dialog) {
        this.dialog.setColorFromString(changes.skyColorpicker.currentValue, false);

      }

    }
    if (changes.presetColors) {
      if (this.dialog) {
        this.dialog.setPresetConfig(this.presetColors);
      }
    }
  }

  public ngOnInit() {

    this.renderer.setElementClass(this.el.nativeElement, 'sky-form-control', true);

    this.pickerChangedSubscription =
      this.skyColorpickerInput.selectedColorChanged.subscribe((newColor: String) => {
        this.writeValue(this.formatter(newColor));
        this._onChange(newColor);
      });



    let hsva = this.service.stringToHsva(this.skyColorpicker);
    if (hsva === undefined) { hsva = this.service.stringToHsva(this.skyColorpicker, true); }
    if (!hsva) {
      hsva = this.service.stringToHsva('#fff');
    }
    let color = this.service.outputFormat(
      hsva,
      this.outputFormat,
      this.alphaChannel === 'hex8'
    );
    if (color !== this.skyColorpicker) {

      this.colorPickerChange.emit(color);
      //  this.cdr.detectChanges();

    }
  }


  public openDialog() {
    if (!this.created) {
      this.created = true;

      this.skyColorpickerInput.setDialog(
        this,
        this.el,
        this.skyColorpicker,
        this.outputFormat,
        this.presetColors,
        this.alphaChannel
      );

      this.dialog = this.skyColorpickerInput;
    } else if (this.dialog) {
      this.dialog.openDialog(this.skyColorpicker);
    }
  }

  public colorChanged(value: string) {

    this.colorPickerChange.emit(value);
  }

  public colorSelected(value: string) {
    this.colorPickerSelect.emit(value);
  }
  /*
    public inputChanged(event: any) {
      this.cpInputChange.emit(event);
    }

    public sliderChanged(event: any) {
      this.cpSliderChange.emit(event);
    }
  */


  @HostListener('change', ['$event'])
  public onChange(event: any) {
    let newValue = event.target.value;
    this.modelValue = this.formatter(newValue);
    this._validatorChange();
    this._onChange(this.modelValue);
    this.writeModelValue(this.modelValue);
  }

  @HostListener('blur')
  public onBlur() {
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
      return;
    }

    if (value.local === 'Invalid Color') {
      return {
        'skyColor': {
          invalid: control.value
        }
      };
    }

  }
  private writeModelValue(model: SkyColorpickerOutput) {

    let setElementValue: SkyColorpickerOutput;
    if (model) {
      if (model !== model) {
        setElementValue = { hex: '' };
      } else {
        setElementValue = { hex: '' };
      }
      this.renderer.setElementProperty(this.el.nativeElement, 'value', setElementValue);
    }
    this.skyColorpickerInput.selectedColor = '#832383';

  }

  private formatter(color: any) {

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

  }
  /*istanbul ignore next */
  private _onChange = (_: any) => { };
  /*istanbul ignore next */
  private _onTouched = () => { };
  private _validatorChange = () => { };

}
