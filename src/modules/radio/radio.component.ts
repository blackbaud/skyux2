import {
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  Input,
  OnDestroy,
  OnInit,
  Component,
  ChangeDetectionStrategy,
  Optional,
  ChangeDetectorRef,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import {
  SkyRadioGroupComponent,
  SkyRadioChange
} from './radio-group/radio-group.component';
import {
  SkyUniqueRadioSelectionService
} from './unique-selection';

let nextId = 0;

// tslint:disable:no-forward-ref no-use-before-declare
export const SKY_RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SkyRadioComponent),
  multi: true
};
// tslint:enable

@Component({
  selector: 'sky-radio',
  templateUrl: 'radio.component.html',
  styleUrls: [
    'radio.component.scss'
  ],
  providers: [
    SKY_RADIO_CONTROL_VALUE_ACCESSOR
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyRadioComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public selectedValue: any;

  @Input()
  public id: string = `sky-radio-${++nextId}`;

  @Input()
  public name: string;

  @Input()
  public label: string;

  @Input()
  public labelledBy: string;

  @Input()
  public describedBy: string;

  @Input()
  public disabled: boolean = false;

  @Input()
  public tabindex: number = 0;

  @Input()
  public get checked(): boolean {
    if (this.radioGroup) {
      return this._checked;
    }
    return this.selectedValue === this.value;
  }
  public set checked(value: boolean) {
    const newCheckedState = !!value;

    if (this._checked !== newCheckedState) {
      this._checked = newCheckedState;

      // With a radio group
      if (this.radioGroup) {
        if (newCheckedState && this.radioGroup.value !== this.value) {
          this.radioGroup.selected = this;
        }
      // without a radio group
      } else {
        if (newCheckedState) {
          this.selectedValue = this.value;
        }
      }

      if (newCheckedState) {
        this.radioDispatcher.notify(this.id, this.name);
      }
      this.changeDetector.markForCheck();
    }
  }

  @Input()
  public get value(): any { return this._value; }
  public set value(value: any) {
    // maintain checked state from before value change
    let wasChecked = this.checked;

    if (this._value !== value) {
      this._value = value;

      // With a radio group
      if (this.radioGroup) {
        if (wasChecked) {
          this.radioGroup.selected = this;
        } else {
          this.checked = this.radioGroup.value === value;
        }

      // Without a radio group
      } else {
        if (wasChecked) {
          this.selectedValue = value;
        } else {
          this.checked = this.selectedValue === value;
        }
      }
    }
  }

  @ViewChild('input')
  public input: ElementRef;

  @Output()
  public readonly change: EventEmitter<SkyRadioChange> = new EventEmitter<SkyRadioChange>();

  public get inputId(): string { return `${this.id}-input`; }

  private _checked: boolean = false;
  private _value: any = undefined;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private radioDispatcher: SkyUniqueRadioSelectionService,
    @Optional() private radioGroup: SkyRadioGroupComponent
  ) {
    this.removeUniqueSelectionListener =
      radioDispatcher.listen((id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          this.checked = false;
        }
    });
  }

  public writeValue(value: any): void {
    if (value === undefined) {
      return;
    }

    if (!this.radioGroup) {
      this.selectedValue = value;
    }
    this.changeDetector.markForCheck();
  }

  public registerOnChange(fn: any): void {
    if (!this.radioGroup) {
      this.onChangeCallback = fn;
    }
  }

  public registerOnTouched(fn: any): void {
    if (!this.radioGroup) {
      this.onTouchedCallback = fn;
    }
  }

  public ngOnInit() {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this._value;
      this.name = this.radioGroup.name;
    }
  }

  public ngOnDestroy() {
    this.removeUniqueSelectionListener();
  }

  public onInputChange(event: Event) {
    event.stopPropagation();

    const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
    this.checked = true;
    this.emitChangeEvent();
    this.onInputFocusChange(undefined);

    if (this.radioGroup) {
      this.radioGroup.controlValueAccessorChangeFn(this.value);
      this.radioGroup.touch();
      if (groupValueChanged) {
        this.radioGroup.emitChangeEvent();
      }
    } else {
      this.onChangeCallback(this.value);
    }
  }

  public onInputFocusChange(event: Event) {
    if (this.radioGroup) {
      this.radioGroup.touch();
    } else {
      this.onTouchedCallback();
    }
  }

  private emitChangeEvent(): void {
    this.change.emit(new SkyRadioChange(this, this._value));
  }

  /* istanbul ignore next */
  /* sanity check */
  private removeUniqueSelectionListener = () => {};
  /* istanbul ignore next */
  /* sanity check */
  private onChangeCallback = (value: any) => {};
  /* istanbul ignore next */
  /* sanity check */
  private onTouchedCallback = () => {};
}
