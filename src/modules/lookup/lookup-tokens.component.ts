import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  SkyLookupChanges
} from './types';

const TOKEN_SELECTOR = '.sky-lookup-token';

@Component({
  selector: 'sky-lookup-tokens',
  templateUrl: './lookup-tokens.component.html',
  styleUrls: ['./lookup-tokens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLookupTokensComponent implements OnInit, OnDestroy {
  @Input()
  public updateTokenStream: Observable<any>;

  @Output()
  public focusLost = new EventEmitter<void>();

  @Output()
  public tokenChanges = new EventEmitter<any>();

  @Input()
  public tokens: any[] = [];

  private tokenElements: any[];
  private focusIndex: number;
  private subscriptions: Subscription[] = [];

  public constructor(
    private elementRef: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.subscriptions.push(
      this.updateTokenStream.subscribe((changes: SkyLookupChanges) => {
        this.tokens = changes.selectedItems;
        this.changeDetector.markForCheck();
      })
    );
  }

  public ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public handleKeyDown(event: KeyboardEvent, token: any) {
    const key = event.key.toLowerCase();

    event.preventDefault();

    switch (key) {
      case 'delete':
      case 'backspace':
      this.removeToken(token);
      setTimeout(() => {
        this.focus();
      });
      break;

      case 'arrowleft':
      this.focusPreviousToken();
      break;

      case 'arrowright':
      this.focusNextToken();
      break;

      case 'tab':
      this.exitFocus();
      break;

      default:
      break;
    }
  }

  public focus() {
    this.tokenElements = this.getTokenElements();
    const index = this.tokenElements.length - 1;

    if (this.tokenElements[index]) {
      this.focusIndex = index;
      this.focusActiveToken();
    } else {
      // No tokens to focus on, fire the blur event:
      this.exitFocus();
    }
  }

  public removeToken(token: any) {
    this.tokens = this.tokens.filter(t => t !== token);
    this.tokenElements = this.getTokenElements();
    this.tokenChanges.emit({
      tokens: this.tokens
    });
  }

  private focusPreviousToken() {
    this.focusIndex--;

    if (this.focusIndex < 0) {
      this.focusIndex = 0;
    }

    this.focusActiveToken();
  }

  private focusNextToken() {
    this.focusIndex++;

    if (this.focusIndex >= this.tokenElements.length) {
      this.exitFocus();
      return;
    }

    this.focusActiveToken();
  }

  private getTokenElements(): any[] {
    return this.elementRef.nativeElement.querySelectorAll(TOKEN_SELECTOR);
  }

  private exitFocus() {
    if (this.focusLost) {
      this.focusLost.emit();
    }
  }

  private focusActiveToken() {
    this.tokenElements[this.focusIndex].focus();
  }
}
