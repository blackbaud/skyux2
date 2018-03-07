import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import {
  SkyToken,
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
  public messageStream: ReplaySubject<SkyTokensMessage>;
  public tokens: SkyToken[];

  public data: any[] = [
    { name: 'Red' },
    { name: 'White' },
    { name: 'Blue' }
  ];

  public onFocusIndexOverRange() { }

  public onFocusIndexUnderRange() { }

  public onTokenSelected(args: SkyTokenSelectedEventArgs) { }

  public publishTokens() {
    this.tokens = this.data.map(value => ({ value }));
  }

  public publishMessageStream() {
    if (this.messageStream) {
      this.messageStream.unsubscribe();
    }

    this.messageStream = new ReplaySubject<SkyTokensMessage>();
  }
}
