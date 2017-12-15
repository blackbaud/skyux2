import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  NgControl
} from '@angular/forms';

import {
  Subscription
} from 'rxjs/Subscription';

import {
  SkyAutocompleteChanges
} from './types';

@Directive({
  selector: '[skyAutocompleteInput]'
})
export class SkyAutocompleteInputDirective implements OnInit, OnDestroy {
  public valueChanges = new EventEmitter<SkyAutocompleteChanges>();

  private subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private control: NgControl
  ) { }

  public ngOnInit() {
    this.subscriptions.push(
      this.control.valueChanges.subscribe((value: string) => {
        this.valueChanges.emit({
          inputValue: value
        });
      })
    );

    // Disable automatic browser behavior on the field.
    const input = this.elementRef.nativeElement;
    input.autocomplete = 'off';
    input.autocapitalize = 'off';
    input.autocorrect = 'off';
    input.spellcheck = 'false';
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public get value(): string {
    return this.control.control.value;
  }

  public set value(val: string) {
    this.control.control.setValue(val);
  }

  public focusElement() {
    this.elementRef.nativeElement.focus();
  }
}
