import {
  Component,
  forwardRef,
  Input
} from '@angular/core';

import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

/**
 * Monotonically increasing integer used to auto-generate unique ids for checkbox components.
 */
let nextId = 0;

/**
 * Provider Expression that allows sky-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 */
// tslint:disable no-forward-ref
export const SKY_RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyRadioComponent),
  multi: true
};
// tslint:enable

@Component({
  selector: 'sky-radio',
  template: require('./radio.component.html'),
  styles: [require('./radio.component.scss')],
  providers: [SKY_RADIO_CONTROL_VALUE_ACCESSOR]
})
export class SkyRadioComponent implements ControlValueAccessor {
  /**
   * Hidden label for screen readers.
   */
  @Input()
  public label: string = '';

  /**
   * Id of label for the checkbox.
   */
  @Input()
  public labelledBy: string;

  @Input()
  public id: string = `sky-radio-${++nextId}`;

  @Input()
  public disabled: boolean = false;

  @Input()
  public tabindex: number = 0;

  @Input()
  public name: string;

  @Input()
  public value: any;

  public get inputId(): string {
    return `input-${this.id}`;
  }

  public selectedValue: any;

  /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
  /*istanbul ignore next */
  public onTouched: () => any = () => {};

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public writeValue(value: any) {
    if (value !== undefined) {
      this.selectedValue = value;
    }
  }

   /**
   * Implemented as part of ControlValueAccessor.
   */
  public registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public onInputBlur() {
    this.onTouched();
  }

  /**
   * Event handler for checkbox input element.
   * Toggles checked state if element is not disabled.
   */
  public onRadioChanged(newValue: any) {

    if (!this.disabled) {
      if (newValue !== this.selectedValue && newValue !== undefined) {
        this.selectedValue = newValue;
        this._controlValueAccessorChangeFn(newValue);
      }
    }
  }

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => {};

}
