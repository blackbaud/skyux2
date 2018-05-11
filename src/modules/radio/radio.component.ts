import {
  SkyRadioGroupDirective,
  SkyRadioChange
} from './radio-group/radio-group.component';
import {
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  Input,
  OnDestroy,
  AfterViewInit,
  OnInit,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Optional,
  ChangeDetectorRef
} from '@angular/core';

/**
 * Auto-incrementing integer used to generate unique ids for checkbox components.
 */
let nextId = 0;

/**
 * A radio-button. Typically placed inside of `<sky-radio-group>` elements.
 */
@Component({
  moduleId: module.id,
  selector: 'sky-radio-button',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.css'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'skyRadioButton',
  host: {
    'class': 'sky-radio-button',
    '[class.sky-radio-checked]': 'checked',
    '[class.sky-radio-disabled]': 'disabled',
    '[attr.id]': 'id',
    // Note: under normal conditions focus shouldn't land on this element, however it may be
    // programmatically set, for example inside of a focus trap, in this case we want to forward
    // the focus to the native element.
    '(focus)': 'input.nativeElement.focus()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyRadioComponent implements OnInit, AfterViewInit, OnDestroy {

  private _uniqueId: string = `sky-radio-${++nextId}`;

  /** The unique ID for the radio button. */
  @Input() public id: string = this._uniqueId;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input() public name: string;

  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input() public ariaLabel: string;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input() public ariaLabelledby: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input() public ariaDescribedby: string;

  /** Whether this radio button is checked. */
  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    const newCheckedState = !!value;
    if (this._checked !== newCheckedState) {
      this._checked = newCheckedState;
      if (newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value === this.value) {

        // When unchecking the selected radio button, update the selected radio
        // property on the group.
        this.radioGroup.selected = undefined;
      }

      if (newCheckedState) {
        // Notify all radio buttons with the same name to un-check.
        this._radioDispatcher.notify(this.id, this.name);
      }
      this._changeDetector.markForCheck();
    }
  }

  /** The value of this radio button. */
  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      if (this.radioGroup) {
        if (!this.checked) {
          // Update checked when the value changed to match the radio group's value
          this.checked = this.radioGroup.value === value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }

  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  @Input()
  get labelPosition(): 'before' | 'after' {
    return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
  }
  set labelPosition(value) {
    this._labelPosition = value;
  }
  private _labelPosition: 'before' | 'after';

  /**
   * Event emitted when the checked state of this radio button changes.
   * Change events are only emitted when the value changes due to user interaction with
   * the radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() public readonly change: EventEmitter<SkyRadioChange> = new EventEmitter<SkyRadioChange>();

  /** The parent radio group. May or may not be present. */
  private radioGroup: SkyRadioGroupDirective;

  /** ID of the native input element inside `<sky-radio-button>` */
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }

  /** Whether this radio is checked. */
  private _checked: boolean = false;

  /** Value assigned to this radio. */
  private _value: any = undefined;

  /** The native `<input type=radio>` element */
  @ViewChild('input') private input: ElementRef;

  constructor(
    @Optional() radioGroup: SkyRadioGroupDirective,
    elementRef: ElementRef,
    private _changeDetector: ChangeDetectorRef,
    private _focusMonitor: FocusMonitor,
    private _radioDispatcher: UniqueSelectionDispatcher
  ) {
    // Assertions. Ideally these should be stripped out by the compiler.
    // TODO(jelbourn): Assert that there's no name binding AND a parent radio group.
    this.radioGroup = radioGroup;

    this._removeUniqueSelectionListener =
      _radioDispatcher.listen((id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          this.checked = false;
        }
      });
  }

  /** Focuses the radio button. */
  public focus(): void {
    this._focusMonitor.focusVia(this.input.nativeElement, 'keyboard');
  }

  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  public _markForCheck() {
    // When group value changes, the button will not be notified. Use `markForCheck` to explicit
    // update radio button's status
    this._changeDetector.markForCheck();
  }

  public ngOnInit() {
    if (this.radioGroup) {
      // If the radio is inside a radio group, determine if it should be checked
      this.checked = this.radioGroup.value === this._value;
      // Copy name from parent radio group
      this.name = this.radioGroup.name;
    }
  }

  public ngAfterViewInit() {
    this._focusMonitor
      .monitor(this.input.nativeElement)
      .subscribe((focusOrigin: any) => this._onInputFocusChange(focusOrigin));
  }

  public ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this.input.nativeElement);
    this._removeUniqueSelectionListener();
  }

  public _onInputClick(event: Event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `radio-button` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }

  /**
   * Triggered when the radio button received a click or the input recognized any change.
   * Clicking on a label element, will trigger a change event on the associated input.
   */
  public _onInputChange(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
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

  /** Function is called whenever the focus changes for the input element. */
  private _onInputFocusChange(focusOrigin: FocusOrigin) {
    if (!focusOrigin) {
      if (this.radioGroup) {
        this.radioGroup._touch();
      }
    }
  }

  /** Unregister function for _radioDispatcher */
  private _removeUniqueSelectionListener: () => void = () => {};

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    this.change.emit(new SkyRadioChange(this, this._value));
  }
}
