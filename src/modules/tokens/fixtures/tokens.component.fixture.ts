import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import {
  SkyTokens,
  SkyTokensChange,
  SkyTokensComponent,
  SkyTokensMessage,
  SkyTokenSelectedEventArgs
} from '../index';

@Component({
  selector: 'sky-tokens-test',
  templateUrl: './tokens.component.fixture.html'
})
export class SkyTokensTestComponent {
  @ViewChild(SkyTokensComponent, { read: ElementRef })
  public tokensElementRef: ElementRef;

  @ViewChild(SkyTokensComponent)
  public tokensComponent: SkyTokensComponent;

  public disabled: boolean;
  public dismissible: boolean;
  public displayWith: string;
  public focusable: boolean;
  public tokenStream: ReplaySubject<SkyTokens>;
  public messageStream: ReplaySubject<SkyTokensMessage>;

  public data: any[] = [
    { name: 'Red' },
    { name: 'White' },
    { name: 'Blue' }
  ];

  public onChanges(change: SkyTokensChange) { }

  public onFocusIndexLimitReached() { }

  public onTokenSelected(args: SkyTokenSelectedEventArgs) { }

  public publishTokenStream() {
    if (this.tokenStream) {
      this.tokenStream.unsubscribe();
    }

    this.tokenStream = new ReplaySubject<SkyTokens>();
    this.tokenStream.next({
      value: this.data
    });
  }

  public publishMessageStream() {
    if (this.messageStream) {
      this.messageStream.unsubscribe();
    }

    this.messageStream = new ReplaySubject<SkyTokensMessage>();
  }
}
