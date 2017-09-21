import {
  Component,
  forwardRef,
  Input
} from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Auto-incrementing integer used to generate unique ids for checkbox components.
 */
let nextId = 0;

/**
 * Provider Expression that allows sky-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 */
// tslint:disable:no-forward-ref no-use-before-declare
export const SKY_RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyRadioComponent),
  multi: true
};
// tslint:enable

@Component({
  selector: 'sky-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
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
  private onChangeCallback: (value: any) => void;

  public onInputBlur() {
    this.onTouchedCallback();
  }

  public onRadioChanged(newValue: any) {
    if (this.disabled) {
      return;
    }

    if (newValue === this.selectedValue) {
      return;
    }

    this.selectedValue = newValue;
    this.onChangeCallback(newValue);
  }

  // Satisfying ControlValueAccessor interface.
  public writeValue(value: any) {
    if (value === undefined) {
      return;
    }

    this.selectedValue = value;
  }

  // onChanged callback set by ControlValueAccessor.
  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // onTouched callback set by ControlValueAccessor.
  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // Satisfying ControlValueAccessor interface.
  /* istanbul ignore next */
  private onTouchedCallback(): () => void {
    return () => {};
  }
}
