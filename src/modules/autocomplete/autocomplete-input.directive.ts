import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Renderer2
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
    private control: NgControl,
    private renderer: Renderer2
  ) { }

  public ngOnInit() {
    this.subscriptions.push(
      this.control.valueChanges.subscribe((value: string) => {
        this.valueChanges.emit({
          inputValue: value
        });
      })
    );

    const input = this.elementRef.nativeElement;
    this.renderer.setAttribute(input, 'autocomplete', 'off');
    this.renderer.setAttribute(input, 'autocapitalize', 'off');
    this.renderer.setAttribute(input, 'autocorrect', 'off');
    this.renderer.setAttribute(input, 'spellcheck', 'false');
    this.renderer.addClass(input, 'sky-form-control');
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
