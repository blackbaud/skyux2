import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import {
  SkyAutocompleteSelectionChange,
  SkyAutocompleteInputDirective
} from '../autocomplete';

import {
  SkyToken,
  SkyTokensMessage,
  SkyTokensMessageType
} from '../tokens';

import {
  SkyWindowRefService
} from '../window';

import { SkyLookupAutocompleteAdapter } from './lookup-autocomplete-adapter';

@Component({
  selector: 'sky-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    /* tslint:disable-next-line:no-forward-ref */
    useExisting: forwardRef(() => SkyLookupComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLookupComponent
  extends SkyLookupAutocompleteAdapter
  implements AfterContentInit, OnDestroy, ControlValueAccessor {

  @Input()
  public ariaLabel: string;

  @Input()
  public ariaLabelledBy: string;

  @Input()
  public disabled = false;

  @Input()
  public placeholderText: string;

  public get tokens(): SkyToken[] {
    return this._tokens;
  }

  public set tokens(value: SkyToken[]) {
    this._tokens = value;
    this.onChange(this.value);
    this.onTouched();
  }

  public get value(): any[] {
    if (!this.tokens) {
      return [];
    }

    return this.tokens.map(token => token.value);
  }

  public isInputFocused = false;
  public tokensController = new ReplaySubject<SkyTokensMessage>();

  @ViewChild(SkyAutocompleteInputDirective)
  private autocompleteInputDirective: SkyAutocompleteInputDirective;

  @ViewChild('lookupInput')
  private lookupInput: ElementRef;

  private destroyed = new ReplaySubject<boolean>();
  private idled = new ReplaySubject<boolean>();
  private markForTokenFocusOnKeyUp = false;

  private _tokens: SkyToken[];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private windowRef: SkyWindowRefService
  ) {
    super();
  }

  public ngAfterContentInit() {
    if (!this.disabled) {
      this.addEventListeners();
    }
  }

  public ngOnDestroy() {
    this.removeEventListeners();
    this.destroyed.next(true);
    this.destroyed.unsubscribe();
  }

  public onAutocompleteSelectionChange(change: SkyAutocompleteSelectionChange) {
    this.addToSelected(change.selectedItem);
    this.focusInput();
  }

  public onTokensChange(change: SkyToken[]) {
    if (!change) {
      return;
    }

    if (change.length === 0) {
      this.focusInput();
    }

    if (this.tokens !== change) {
      this.tokens = change;
    }
  }

  public onTokensFocusIndexOverRange() {
    this.windowRef.getWindow().setTimeout(() => {
      this.focusInput();
    });
  }

  public writeValue(value: any[]) {
    if (value && !this.disabled) {
      const copy = this.cloneItems(value);
      this.tokens = this.parseTokens(copy);
    }
  }

  // Angular automatically constructs these methods.
  /* istanbul ignore next */
  public onChange = (value: any[]) => {};
  /* istanbul ignore next */
  public onTouched = () => {};

  public registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  public setDisabledState(disabled: boolean) {
    this.removeEventListeners();

    if (!disabled) {
      this.addEventListeners();
    }

    this.disabled = disabled;
    this.changeDetector.markForCheck();
  }

  private addToSelected(item: any) {
    let selectedItems: any[] = [];

    if (this.tokens) {
      selectedItems = this.tokens.map(token => token.value);
    }

    // Add the new item.
    selectedItems = selectedItems.concat(item);

    this.writeValue(selectedItems);
    this.clearSearchText();
  }

  private addEventListeners() {
    const inputElement = this.lookupInput.nativeElement;
    const hostElement = this.elementRef.nativeElement;
    const documentObj = this.windowRef.getWindow().document;

    let isSomethingFocused = false;

    Observable
      .fromEvent(inputElement, 'keydown')
      .takeUntil(this.idled)
      .subscribe((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        if (key === 'arrowleft' || key === 'backspace') {
          const isSearchEmpty = (!this.lookupInput.nativeElement.value);
          if (isSearchEmpty) {
            this.markForTokenFocusOnKeyUp = true;
          } else {
            this.markForTokenFocusOnKeyUp = false;
          }
        }
      });

    Observable
      .fromEvent(inputElement, 'keyup')
      .takeUntil(this.idled)
      .subscribe((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        /* tslint:disable-next-line:switch-default */
        switch (key) {
          case 'arrowleft':
          case 'backspace':
          if (this.markForTokenFocusOnKeyUp) {
            this.tokensController.next({
              type: SkyTokensMessageType.FocusLastToken
            });
            event.preventDefault();
          }
          break;

          case 'escape':
          this.clearSearchText();
          event.preventDefault();
          break;
        }
      });

    Observable
      .fromEvent(documentObj, 'mousedown')
      .takeUntil(this.idled)
      .subscribe((event: MouseEvent) => {
        const hostClicked = (hostElement.contains(event.target));

        isSomethingFocused = false;

        if (hostClicked) {
          this.isInputFocused = true;
        } else {
          this.isInputFocused = false;
          isSomethingFocused = true;
        }

        this.changeDetector.markForCheck();
      });

    Observable
      .fromEvent(documentObj, 'mouseup')
      .takeUntil(this.idled)
      .subscribe(() => {
        if (!isSomethingFocused) {
          this.focusInput();
        }
      });

    Observable
      .fromEvent(documentObj, 'focusin')
      .takeUntil(this.idled)
      .subscribe((event: KeyboardEvent) => {
        if (hostElement.contains(event.target)) {
          isSomethingFocused = true;
          this.isInputFocused = true;
        } else {
          this.isInputFocused = false;
        }

        this.changeDetector.markForCheck();
      });
  }

  private removeEventListeners() {
    this.idled.next(true);
    this.idled.unsubscribe();
    this.idled = new ReplaySubject<boolean>();
  }

  private focusInput() {
    this.lookupInput.nativeElement.focus();
  }

  private clearSearchText() {
    this.autocompleteInputDirective.value = undefined;
  }

  private cloneItems(items: any[]): any[] {
    // if (!Array.isArray(items)) {
    //   return [];
    // }

    console.log('cloneItems():', items);
    return items.map(item => {
      return { ...item };
    });
  }

  private parseTokens(data: any[]): SkyToken[] {
    return data.map((item: any) => {
      return {
        value: item
      };
    });
  }
}
