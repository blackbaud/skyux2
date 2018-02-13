import {
  AfterViewInit,
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
import 'rxjs/add/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {
  SkyTokenComponent
} from './token.component';

@Component({
  selector: 'sky-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyTokensComponent implements OnInit, AfterViewInit, OnDestroy {
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
  public tokenStream: Observable<any>;

  @Output()
  public changes = new EventEmitter<any>();

  @Output()
  public blur = new EventEmitter<void>();

  @ViewChildren(SkyTokenComponent)
  public tokenElements: QueryList<SkyTokenComponent>;

  private destroy = new Subject<boolean>();
  private focusIndex = 0;
  private tokens: any[];

  private _displayWith: string;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.tokenStream
      .takeUntil(this.destroy)
      .subscribe((args: any) => {
        this.tokens = args.tokens;
        this.changeDetector.markForCheck();
      });
  }

  public ngAfterViewInit() {
    // this.tokenElements.changes.subscribe((changes: any) => {
    //   this.focusLastToken();
    // });
  }

  public ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  public onKeyDown(event: KeyboardEvent, token: any) {
    const key = event.key.toLowerCase();

    if (this.disabled) {
      return;
    }

    switch (key) {
      case 'delete':
      case 'backspace':
      this.removeToken(token);
      setTimeout(() => {
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

      // case 'tab':
      // this.exitFocus();
      // break;

      default:
      break;
    }
  }

  public onClick(token: any) {
    this.tokens.find((t: any, i: number) => {
      if (t === token) {
        this.focusIndex = i;
        return t;
      }
    });
  }

  public onFocus(index: number) {
    this.focusIndex = index;
  }

  public removeToken(token: any) {
    this.tokens = this.tokens.filter(t => t !== token);
    this.changes.emit({
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
    if (this.focusIndex >= this.tokens.length) {
      this.focusIndex = this.tokens.length - 1;
      this.exitFocus();
    } else {
      this.focusActiveToken();
    }
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
    this.blur.emit();
  }
}
