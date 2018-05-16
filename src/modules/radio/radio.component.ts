import {
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  Input,
  OnDestroy,
  OnInit,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Optional,
  ChangeDetectorRef
} from '@angular/core';

import {
  SkyRadioGroupComponent,
  SkyRadioChange
} from './radio-group/radio-group.component';
import {
  UniqueSelectionService
} from './unique-selection';

let nextId = 0;

@Component({
  moduleId: module.id,
  selector: 'sky-radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'skyRadioButton',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyRadioComponent implements OnInit, OnDestroy {

  private _uniqueId: string = `sky-radio-${++nextId}`;

  @Input() public id: string = this._uniqueId;

  @Input() public name: string;

  @Input() public ariaLabel: string;

  @Input() public ariaLabelledby: string;

  @Input() public ariaDescribedby: string;

  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    const newCheckedState = !!value;
    if (this._checked !== newCheckedState) {
      this._checked = newCheckedState;
      if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {
        this.radioGroup.selected = undefined;
      }

      if (newCheckedState) {
        this._radioDispatcher.notify(this.id, this.name);
      }
      this._changeDetector.markForCheck();
    }
  }

  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      if (this.radioGroup) {
        if (!this.checked) {
          this.checked = this.radioGroup.value === value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }

  @Input()
  get labelPosition(): 'before' | 'after' {
    return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
  }
  set labelPosition(value) {
    this._labelPosition = value;
  }
  private _labelPosition: 'before' | 'after';

  @Output() public readonly change: EventEmitter<SkyRadioChange> = new EventEmitter<SkyRadioChange>();

  private radioGroup: SkyRadioGroupComponent;

  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  private _checked: boolean = false;

  private _value: any = undefined;

  @ViewChild('input') private input: ElementRef;

  constructor(
    @Optional() radioGroup: SkyRadioGroupComponent,
    elementRef: ElementRef,
    private _changeDetector: ChangeDetectorRef,
    private _radioDispatcher: UniqueSelectionService
  ) {
    this.radioGroup = radioGroup;

    this._removeUniqueSelectionListener =
      _radioDispatcher.listen((id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          this.checked = false;
        }
      });
  }

  public focus(): void {
    this.input.nativeElement.focus();
  }

  public _markForCheck() {
    this._changeDetector.markForCheck();
  }

  public ngOnInit() {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this._value;
      this.name = this.radioGroup.name;
    }
  }

  public ngOnDestroy() {
    this._removeUniqueSelectionListener();
  }

  public _onInputClick(event: Event) {
    event.stopPropagation();
  }

  public _onInputChange(event: Event) {
    event.stopPropagation();

    const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
    this.checked = true;
    this._emitChangeEvent();

    if (this.radioGroup) {
      this.radioGroup._controlValueAccessorChangeFn(this.value);
      this.radioGroup._touch();
      if (groupValueChanged) {
        this.radioGroup._emitChangeEvent();
      }
    }
  }

  public onInputFocusChange(event: Event) {
    if (this.radioGroup) {
      this.radioGroup._touch();
    }
  }

  private _removeUniqueSelectionListener: () => void = () => {};

  private _emitChangeEvent(): void {
    this.change.emit(new SkyRadioChange(this, this._value));
  }
}
