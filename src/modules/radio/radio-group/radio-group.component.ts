import {
  AfterContentInit,
  ChangeDetectorRef,
  Input,
  ContentChildren,
  forwardRef,
  QueryList,
  EventEmitter,
  Output,
  Component
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
  SkyRadioComponent
} from '../radio.component';

/**
 * Auto-incrementing integer used to generate unique ids for checkbox components.
 */
let nextId = 0;

/**
 * Provider Expression that allows sky-radio-group to register as a ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 * @docs-private
 */
// tslint:disable:no-forward-ref no-use-before-declare
export const SKY_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyRadioGroupComponent),
  multi: true
};
// tslint:enable

/** Change event object emitted by SkyRadio and SkyRadioGroup. */
export class SkyRadioChange {
  constructor(
    /** The SkyRadioComponent that emits the change event. */
    public source: SkyRadioComponent,
    /** The value of the SkyRadioComponent. */
    public value: any) {}
}

/**
 * A group of radio buttons. May contain one or more `<sky-radio>` elements.
 */
@Component({
  selector: 'sky-radio-group',
  templateUrl: 'radio-group.component.html',
  styleUrls: ['radio-group.component.scss'],
  exportAs: 'skyRadioGroup',
  providers: [SKY_RADIO_GROUP_CONTROL_VALUE_ACCESSOR]
})
export class SkyRadioGroupComponent implements AfterContentInit, ControlValueAccessor {
  /**
   * Selected value for group. Should equal the value of the selected radio button if there *is*
   * a corresponding radio button with a matching value. If there is *not* such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  private _value: any = undefined;

  /** The HTML name attribute applied to radio buttons in this group. */
  private _name: string = `sky-radio-group-${nextId++}`;

  /** The currently selected radio button. Should match value. */
  private _selected: SkyRadioComponent = undefined;

  /** Whether the `value` has been set to its initial value. */
  private _isInitialized: boolean = false;

  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  private _labelPosition: 'before' | 'after' = 'after';

  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() public readonly change: EventEmitter<SkyRadioChange> = new EventEmitter<SkyRadioChange>();

  /** Child radio buttons. */
  @ContentChildren('sky-radio', { descendants: true })
  private _radios: QueryList<SkyRadioComponent>;

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }

  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  @Input()
  get labelPosition(): 'before' | 'after' {
    return this._labelPosition;
  }
  set labelPosition(v) {
    this._labelPosition = v === 'before' ? 'before' : 'after';
    this._markRadiosForCheck();
  }

  /** Value of the radio button. */
  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;

      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }

  /** Whether the radio button is selected. */
  @Input()
  get selected() { return this._selected; }
  set selected(selected: SkyRadioComponent | null) {
    this._selected = selected;
    this.value = selected ? selected.value : undefined;
    this._checkSelectedRadioButton();
  }

  constructor(private _changeDetector: ChangeDetectorRef) { }

  public _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   */
  public ngAfterContentInit() {
    // Mark this component as initialized in AfterContentInit because the initial value can
    // possibly be set by NgModel on SkyRadioGroup, and it is possible that the OnInit of the
    // NgModel occurs *after* the OnInit of the SkyRadioGroup.
    this._isInitialized = true;
  }

  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  public _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  /** Dispatch change event with current selection and group value. */
  public _emitChangeEvent(): void {
    if (this._isInitialized) {
      this.change.emit(new SkyRadioChange(this._selected!, this._value));
    }
  }

  public _markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach(radio => radio._markForCheck());
    }
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  public writeValue(value: any) {
    this.value = value;
    this._changeDetector.markForCheck();
  }

  public registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public _controlValueAccessorChangeFn: (value: any) => void = () => {};

  public onTouched: () => any = () => {};

  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach(radio => {
        radio.name = this.name;
      });
    }
  }

  private _updateSelectedRadioFromValue(): void {
    const isAlreadySelected = this._selected && this._selected.value === this._value;

    if (this._radios && !isAlreadySelected) {
      this._selected = undefined;
      this._radios.forEach(radio => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }
}
