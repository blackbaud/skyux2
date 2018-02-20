import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/takeUntil';

import {
  SkyToken,
  SkyTokens,
  SkyTokensChange,
  SkyTokensMessage,
  SkyTokensMessageType,
  SkyTokenSelectedEventArgs
} from './types';

import { SkyTokenComponent } from './token.component';

@Component({
  selector: 'sky-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTokensComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public disabled = false;

  @Input()
  public dismissible = true;

  @Input()
  public set displayWith(value: string) {
    this._displayWith = value;
  }

  public get displayWith(): string {
    return this._displayWith || 'name';
  }

  @Input()
  public focusable = true;

  @Input()
  public messageStream = new ReplaySubject<SkyTokensMessage>();

  @Input()
  public tokenStream: ReplaySubject<SkyTokens>;

  @Output()
  public changes = new EventEmitter<SkyTokensChange>();

  @Output()
  public focusEnd = new EventEmitter<void>();

  @Output()
  public tokenSelected = new EventEmitter<SkyTokenSelectedEventArgs>();

  public get activeIndex(): number {
    return this._activeIndex || 0;
  }

  public set activeIndex(value: number) {
    if (value >= this.tokens.length) {
      value = this.tokens.length - 1;
      this.focusEnd.emit();
    }

    if (value < 0) {
      value = 0;
    }

    this._activeIndex = value;
  }

  @ViewChildren(SkyTokenComponent)
  private tokenComponents: QueryList<SkyTokenComponent>;
  private destroyed = new ReplaySubject<boolean>();
  private tokenStreamDestroyed = new ReplaySubject<boolean>();

  private get tokens(): SkyToken[] {
    return this._tokens || [];
  }

  private set tokens(value: SkyToken[]) {
    this._tokens = value;
  }

  private _activeIndex: number;
  private _tokens: SkyToken[];
  private _displayWith: string;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.messageStream
      .takeUntil(this.destroyed)
      .subscribe((message: SkyTokensMessage) => {
        this.handleIncomingMessages(message);
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.tokenStream) {
      this.resetTokenStream();

      if (!changes.tokenStream.currentValue) {
        this.tokens = [];
        this.notifyChanges();
        return;
      }

      this.tokenStream
        .takeUntil(this.tokenStreamDestroyed)
        .subscribe((tokens: SkyTokens) => {
          this.tokens = tokens.value.map(value => ({ value }));
          this.changeDetector.markForCheck();
        });
    }
  }

  public ngOnDestroy() {
    this.resetTokenStream();
    this.destroyed.next(true);
    this.destroyed.unsubscribe();
  }

  public onTokenClick(token: SkyToken) {
    if (!this.isSelectable()) {
      return;
    }

    this.notifyTokenSelected(token);
  }

  public onTokenKeyUp(event: KeyboardEvent, token: SkyToken) {
    const key = event.key.toLowerCase();

    if (!this.isSelectable()) {
      return;
    }

    /* tslint:disable-next-line:switch-default */
    switch (key) {
      case 'arrowleft':
      this.focusPreviousToken();
      event.preventDefault();
      break;

      case 'arrowright':
      this.focusNextToken();
      event.preventDefault();
      break;

      case 'enter':
      this.notifyTokenSelected(token);
      event.preventDefault();
      break;
    }
  }

  public removeToken(token: any) {
    this.tokens = this.tokens.filter(t => t !== token);
    this.notifyChanges();
    this.focusPreviousToken();
  }

  private focusPreviousToken() {
    this.activeIndex--;
    this.focusActiveToken();
  }

  private focusNextToken() {
    this.activeIndex++;
    this.focusActiveToken();
  }

  private focusLastToken() {
    this.activeIndex = this.tokenComponents.length - 1;
    this.focusActiveToken();
  }

  private focusActiveToken() {
    const tokenComponent = this.tokenComponents
      .find((comp: SkyTokenComponent, i: number) => {
        return (this.activeIndex === i);
      });

    if (tokenComponent) {
      tokenComponent.focusElement();
    }
  }

  private resetTokenStream() {
    this.tokenStreamDestroyed.next(true);
    this.tokenStreamDestroyed.unsubscribe();
    this.tokenStreamDestroyed = new ReplaySubject<boolean>();
  }

  private handleIncomingMessages(message: SkyTokensMessage) {
    /* tslint:disable-next-line:switch-default */
    switch (message.type) {
      case SkyTokensMessageType.FocusLastToken:
      this.focusLastToken();
      break;
    }
  }

  private notifyChanges() {
    this.changes.next({
      tokens: this.tokens
    });
  }

  private notifyTokenSelected(token: SkyToken) {
    this.tokenSelected.emit({
      token
    });
  }

  private isSelectable(): boolean {
    return (!this.disabled && this.focusable);
  }
}
