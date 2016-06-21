
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    Provider,
    forwardRef
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/common';

/**
 * Monotonically increasing integer used to auto-generate unique ids for checkbox components.
 */
let nextId = 0;

/**
 * Provider Expression that allows sky-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)] and ngControl.
 */
// tslint:disable no-forward-ref
const SKY_CHECKBOX_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
      useExisting: forwardRef(() => SkyCheckboxComponent),
      multi: true
    });
// tslint:enable

// A simple change event emitted by the SkyCheckbox component.
export class SkyCheckboxChange {
  public source: SkyCheckboxComponent;
  public checked: boolean;
}

@Component({
  selector: 'sky-checkbox',
  template: require('./checkbox.component.html'),
  styles: [require('./checkbox.component.scss')],
  providers: [SKY_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyCheckboxComponent implements ControlValueAccessor {

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
  public id: string = `sky-checkbox-${++nextId}`;

  @Input()
  public disabled: boolean = false;

  @Input()
  public tabindex: number = 0;

  @Input()
  public name: string = undefined;

  @Output()
  public change: EventEmitter<SkyCheckboxChange> = new EventEmitter<SkyCheckboxChange>();

  private _checked: boolean = false;

  public get inputId(): string {
    return `input-${this.id}`;
  }

  /** Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor. */
  public onTouched: () => any = () => {};

  @Input()
  public get checked() {
    return this._checked;
  }

  public set checked(checked: boolean) {
    if (checked !== this.checked) {
      this._checked = checked;

      this._emitChangeEvent();
    }
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  public writeValue(value: any) {
    this.checked = !!value;
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

  /**
   * Event handler for checkbox input element.
   * Toggles checked state if element is not disabled.
   */
  public onInteractionEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();

    if (!this.disabled) {
      this._toggle();
    }
  }

  public onInputBlur() {
    this.onTouched();
  }

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => {};

  private _emitChangeEvent() {
    let event = new SkyCheckboxChange();
    event.source = this;
    event.checked = this.checked;

    this._controlValueAccessorChangeFn(this.checked);
    this.change.emit(event);
  }

  /**
   * Toggles the `checked` value between true and false
   */
  private _toggle() {
    this.checked = !this.checked;
  }
}
