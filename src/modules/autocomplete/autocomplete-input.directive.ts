import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  OnInit,
  Renderer2
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import {
  SkyAutocompleteInputTextChange
} from './types';

@Directive({
  selector: 'input[skyAutocomplete], textarea[skyAutocomplete]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      /* tslint:disable-next-line:no-forward-ref */
      useExisting: forwardRef(() => SkyAutocompleteInputDirective),
      multi: true
    }
  ]
})
export class SkyAutocompleteInputDirective implements OnInit, ControlValueAccessor {
  public set displayWith(value: string) {
    this._displayWith = value;
    this.setTextValue(this.value[this.displayWith]);
  }

  public get displayWith(): string {
    return this._displayWith || 'name';
  }

  public get value() {
    return this._value || { };
  }

  public set value(value: any) {
    this._value = value;
    this.setTextValue(value[this.displayWith]);
    this.onChange(value);
    this.onTouched();
  }

  public textChanges = new EventEmitter<SkyAutocompleteInputTextChange>();

  private _displayWith: string;
  private _value: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  public ngOnInit() {
    this.setElementAttributes();
  }

  @HostListener('keyup')
  public notifyTextChange() {
    this.textChanges.emit({
      value: this.elementRef.nativeElement.value
    });
  }

  @HostListener('blur', ['$event'])
  public onBlur(event: KeyboardEvent) {
    const text = this.elementRef.nativeElement.value;
    const displayValue = this.value[this.displayWith];

    // If the search field contains text, make sure that the value
    // matches the selected descriptor key.
    if (text && displayValue) {
      if (text !== displayValue) {
        this.setTextValue(displayValue);
      }
    } else {
      // The search field is empty (or doesn't have a selected item),
      // so clear out the selected value.
      this.value = { };
    }
  }

  public writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  // Angular constructs these methods.
  /* istanbul ignore next */
  public onChange(value: any) {}
  /* istanbul ignore next */
  public onTouched() {}

  public registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  private setTextValue(value = '') {
    this.elementRef.nativeElement.value = value;
  }

  private setElementAttributes() {
    const input = this.elementRef.nativeElement;
    this.renderer.setAttribute(input, 'autocomplete', 'off');
    this.renderer.setAttribute(input, 'autocapitalize', 'off');
    this.renderer.setAttribute(input, 'autocorrect', 'off');
    this.renderer.setAttribute(input, 'spellcheck', 'false');
    this.renderer.addClass(input, 'sky-form-control');
  }
}
