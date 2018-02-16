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

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {
  SkyWindowRefService
} from '../../modules/window';

import {
  SkyTokens,
  SkyTokensChange,
  SkyTokensMessage,
  SkyTokensMessageType
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
  public set allowFocus(value: boolean) {
    this._allowFocus = value;
  }

  public get allowFocus(): boolean {
    return (this._allowFocus && !this.disabled);
  }

  @Input()
  public disabled = false;

  @Input()
  public set displayWith(value: string) {
    this._displayWith = value;
  }

  public get displayWith(): string {
    return this._displayWith || 'name';
  }

  @Input()
  public messageStream = new Subject<SkyTokensMessage>();

  @Input()
  public tokenStream: Observable<SkyTokens>;

  @Output()
  public changes = new EventEmitter<SkyTokensChange>();

  public get activeIndex(): number {
    return this._activeIndex || 0;
  }

  public set activeIndex(value: number) {
    if (value >= this.tokens.length) {
      value = this.tokens.length - 1;
    }

    if (value < 0) {
      value = 0;
    }

    if (this._activeIndex !== value) {
      this.changes.next({
        activeIndex: value
      });
    }

    this._activeIndex = value;
  }

  @ViewChildren(SkyTokenComponent)
  private tokenComponents: QueryList<SkyTokenComponent>;
  private destroy = new Subject<boolean>();
  private tokenStreamDestroy = new Subject<boolean>();

  private get tokens(): any[] {
    return this._tokens || [];
  }

  private set tokens(value: any[]) {
    console.log('set tokens:', value);
    this._tokens = value;
  }

  private _activeIndex: number;
  private _allowFocus = false;
  private _tokens: any[];
  private _displayWith: string;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private windowRef: SkyWindowRefService
  ) { }

  public ngOnInit() {
    this.messageStream
      .takeUntil(this.destroy)
      .subscribe((message: SkyTokensMessage) => {
        this.handleIncomingMessages(message);
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.tokenStream) {
      this.resetTokenStream();

      if (!changes.tokenStream.currentValue) {
        this.tokens = [];
        this.changes.next({
          tokens: this.tokens
        });
        return;
      }

      this.tokenStream
        .takeUntil(this.tokenStreamDestroy)
        .subscribe((tokens: SkyTokens) => {
          console.log('token stream:', tokens);
          this.tokens = tokens.value;
          this.changeDetector.markForCheck();
        });
    }
  }

  public ngOnDestroy() {
    this.resetTokenStream();
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  public onKeyUp(event: KeyboardEvent, token: any) {
    const key = event.key.toLowerCase();

    /* tslint:disable-next-line:switch-default */
    switch (key) {
      case 'delete':
      case 'backspace':
      this.removeToken(token);
      this.windowRef.getWindow().setTimeout(() => {
        this.focusPreviousToken();
      });
      event.preventDefault();
      break;

      case 'arrowleft':
      this.focusPreviousToken();
      event.preventDefault();
      break;

      case 'arrowright':
      this.focusNextToken();
      event.preventDefault();
      break;
    }
  }

  public removeToken(token: any) {
    this.tokens = this.tokens.filter(t => t !== token);
    this.changes.next({
      tokens: this.tokens
    });
  }

  public getTabIndex(): any {
    if (this.disabled) {
      return false;
    }

    return (this.allowFocus) ? 0 : -1;
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
      .find((token: any, i: number) => {
        return (this.activeIndex === i);
      });

    if (tokenComponent) {
      tokenComponent.focusElement();
    }
  }

  private resetTokenStream() {
    this.tokenStreamDestroy.next(true);
    this.tokenStreamDestroy.unsubscribe();
    this.tokenStreamDestroy = new Subject<boolean>();
  }

  private handleIncomingMessages(message: SkyTokensMessage) {
    /* tslint:disable-next-line:switch-default */
    switch (message.type) {
      case SkyTokensMessageType.FocusLastToken:
      this.focusLastToken();
      break;
    }
  }
}
