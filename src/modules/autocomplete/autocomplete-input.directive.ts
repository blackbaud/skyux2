import {
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
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
      /*tslint:disable:no-forward-ref */
      useExisting: forwardRef(() => SkyAutocompleteInputDirective),
      multi: true
    }
  ]
})
export class SkyAutocompleteInputDirective implements OnInit, ControlValueAccessor {
  @Input()
  public disabled = false;

  public set descriptorProperty(value: string) {
    this._descriptorProperty = value;
  }

  public get descriptorProperty(): string {
    return this._descriptorProperty || 'name';
  }

  public get selectedItem() {
    return this._selectedItem;
  }

  public set selectedItem(value: any) {
    this._selectedItem = value;
    this.setElementValue(value[this.descriptorProperty] || '');
    this.onChange(value);
    this.onTouched();
  }

  public inputText = '';
  public inputTextChange = new EventEmitter<SkyAutocompleteInputTextChange>();

  private _descriptorProperty: string;
  private _selectedItem: any = {};

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  public ngOnInit() {
    this.setElementAttributes();
  }

  @HostListener('keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent) {
    const value = this.elementRef.nativeElement.value;
    this.inputText = value;
    this.inputTextChange.emit({ value });
    event.preventDefault();
  }

  @HostListener('blur')
  public onBlur() {
    const searchText = this.elementRef.nativeElement.value;
    const descriptorValue = this.selectedItem[this.descriptorProperty];

    // If the search field contains text, make sure that the display value
    // matches the selected descriptor key.
    if (searchText && descriptorValue) {
      this.setElementValue(descriptorValue);
    } else {
      // The search field is empty, so clear out the selected value.
      this.selectedItem = {};
    }
  }

  public writeValue(value: any) {
    if (value) {
      this.selectedItem = value;
    }
  }

  public onChange(value: any) {}
  public onTouched() {}

  public registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private setElementValue(value: string) {
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
