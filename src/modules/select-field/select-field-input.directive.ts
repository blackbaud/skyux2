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

import { Subscription } from 'rxjs/Subscription';
import { SkySelectFieldComponent } from './select-field.component';
import { SkySelectFieldOutput, SkySelectFieldListItems } from './select-field.interface';
import { SkySelectFieldContext } from './select-field-context';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  NG_VALIDATORS,
  AbstractControl,
  NgModel
} from '@angular/forms';

// tslint:disable:no-forward-ref no-use-before-declare
const SKY_SELECT_FIELD_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkySelectFieldInputDirective),
  multi: true
};

const SKY_SELECT_FIELD_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SkySelectFieldInputDirective),
  multi: true
};
// tslint:enable
@Directive({
  selector: '[skySelectFieldInput]',
  providers: [
    SKY_SELECT_FIELD_VALUE_ACCESSOR,
    SKY_SELECT_FIELD_VALIDATOR
  ]
})
export class SkySelectFieldInputDirective implements
  OnInit, OnDestroy, ControlValueAccessor, Validator, OnChanges {

  public selectFieldChangedSubscription: Subscription;

  @Input()
  public skySelectFieldInput: SkySelectFieldComponent;

  @Input()
  public selectFieldStyle: string;

  @Input()
  public selectFieldContent: Array<SkySelectFieldListItems>;

  @Input()
  public selectFieldText: string;

  @Input()
  public ngModel: SkySelectFieldListItems[];

  @Input()
  public selectFieldContext: SkySelectFieldContext;

  // private modelValue: SkySelectFieldListItems[];
  public constructor(private renderer: Renderer, private elRef: ElementRef) {
  }

  public ngOnInit() {

    this.renderer.setElementClass(this.elRef.nativeElement, 'sky-form-control', true);
    let context = new SkySelectFieldContext();
    if (context.selectFieldStyle === 'multiple') {
      context.selectFieldText = this.selectFieldStyle === 'multiple' ? 'Select some values' : 'Select a value';
      context.pickerHeader = this.selectFieldStyle === 'multiple' ? 'Select values' : 'Select value';
    }
    context.selectFieldText = this.selectFieldText || context.selectFieldText;
    context.selectFieldStyle = this.selectFieldStyle || context.selectFieldStyle;
    context.pickerContent = this.selectFieldContent || context.pickerContent;
    context.initialSelectedItems = this.ngModel || context.initialSelectedItems;

    this.selectFieldContext = this.selectFieldContext || context;
    this.skySelectFieldInput.selectFieldContext = this.selectFieldContext;

    this.selectFieldChangedSubscription =
      this.skySelectFieldInput.selectFieldChanged.subscribe((newSelectField: any) => {
        this._onChange(newSelectField);
      });

  }
  public ngOnDestroy() {
    this.selectFieldChangedSubscription.unsubscribe();
  }

  public ngOnChanges(changes: SimpleChanges) {
    this._validatorChange();
  }

  public registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }
  public registerOnTouched(fn: () => any): void { this._onTouched = fn; }
  public registerOnValidatorChange(fn: () => void): void { this._validatorChange = fn; }

  public writeValue(value: any) {  }

  public validate(control: AbstractControl): { [key: string]: any } {
    return undefined;
  }

  /*istanbul ignore next */
  private _onChange = (_: any) => { };
  /*istanbul ignore next */
  private _onTouched = () => { };
  private _validatorChange = () => { };

}
