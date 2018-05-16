import {
  AfterContentInit,
  ChangeDetectorRef,
  Input,
  ContentChildren,
  forwardRef,
  QueryList,
  EventEmitter,
  Output,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import {
  SkyRadioComponent
} from '../radio.component';

let nextId = 0;

// tslint:disable:no-forward-ref no-use-before-declare
export const SKY_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyRadioGroupComponent),
  multi: true
};
// tslint:enable

export class SkyRadioChange {
  constructor(
    public source: SkyRadioComponent,
    public value: any) {}
}

@Component({
  selector: 'sky-radio-group',
  templateUrl: 'radio-group.component.html',
  styleUrls: ['radio-group.component.scss'],
  exportAs: 'skyRadioGroup',
  providers: [SKY_RADIO_GROUP_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyRadioGroupComponent implements AfterContentInit, ControlValueAccessor {
  private _value: any = undefined;
  private _name: string = `sky-radio-group-${nextId++}`;
  private _selected: SkyRadioComponent = undefined;
  private _isInitialized: boolean = false;

  @Output() public readonly change: EventEmitter<SkyRadioChange> = new EventEmitter<SkyRadioChange>();

  @ContentChildren('sky-radio', { descendants: true })
  private _radios: QueryList<SkyRadioComponent>;

  @Input()
  get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }

  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (this._value !== newValue) {
      this._value = newValue;

      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }

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

  public ngAfterContentInit() {
    this._isInitialized = true;
  }

  public _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

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
