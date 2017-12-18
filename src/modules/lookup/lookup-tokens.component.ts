import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  SkyLookupChanges
} from './types';

import {
  SkyLookupTokenComponent
} from './lookup-token.component';

@Component({
  selector: 'sky-lookup-tokens',
  templateUrl: './lookup-tokens.component.html',
  styleUrls: ['./lookup-tokens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyLookupTokensComponent implements OnInit, OnDestroy {
  @Input()
  public disabled = false;

  @Input()
  public tokens: any[] = [];

  @Input()
  public tokenStream: Observable<any>;

  @Output()
  public tokenChanges = new EventEmitter<SkyLookupChanges>();

  @Output()
  public tokensBlur = new EventEmitter<void>();

  // TODO: need to run focus behavior in the same way that dropdown is doing it
  // RE: watching for viewchildren changes
  @ViewChildren(SkyLookupTokenComponent)
  public tokenElements: QueryList<SkyLookupTokenComponent>;

  private focusIndex: number;
  private subscriptions: Subscription[] = [];

  public constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.subscriptions.push(
      this.tokenStream.subscribe((changes: SkyLookupChanges) => {
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

  public onKeyDown(event: KeyboardEvent, token: any) {
    const key = event.key.toLowerCase();

    event.preventDefault();

    if (this.disabled) {
      return;
    }

    switch (key) {
      case 'delete':
      case 'backspace':
      this.removeToken(token);
      this.focusPreviousToken();
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

  public removeToken(token: any) {
    this.tokens = this.tokens.filter(t => t !== token);
    this.tokenChanges.emit({
      tokens: this.tokens
    });
  }

  public focusLastToken() {
    const lastToken = this.tokenElements.last;

    if (this.disabled) {
      return;
    }

    if (lastToken) {
      lastToken.focusElement();
      this.focusIndex = this.tokenElements.length - 1;
    } else {
      this.exitFocus();
    }
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
    this.focusActiveToken();
  }

  private focusActiveToken() {
    const activeToken = this.tokenElements.find((token: any, i: number) => {
      return (this.focusIndex === i);
    });

    if (activeToken) {
      activeToken.focusElement();
    } else {
      this.exitFocus();
    }
  }

  private exitFocus() {
    this.tokensBlur.emit();
  }
}
