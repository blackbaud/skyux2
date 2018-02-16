import {
  Component
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  SkyTokens,
  SkyTokensChange
} from '../../modules/tokens';

@Component({
  selector: 'sky-tokens-demo',
  templateUrl: './tokens-demo.component.html'
})
export class SkyTokensDemoComponent {
  public tokenStream: BehaviorSubject<SkyTokens>;

  private defaultColors = [
    { name: 'Red' },
    { name: 'Black' },
    { name: 'Blue' },
    { name: 'Brown' },
    { name: 'Green' },
    { name: 'Orange' },
    { name: 'Pink' },
    { name: 'Purple' },
    { name: 'Turquoise' },
    { name: 'White' },
    { name: 'Yellow' }
  ];

  constructor() {
    this.createTokenStream();
  }

  public resetTokenStream() {
    if (!this.tokenStream) {
      this.createTokenStream();
    }

    this.tokenStream.next({
      value: this.defaultColors
    });
  }

  public changeTokenStream() {
    if (!this.tokenStream) {
      this.createTokenStream();
    }

    this.tokenStream.next({
      value: [
        { name: 'Red' },
        { name: 'White' },
        { name: 'Blue' }
      ]
    });
  }

  public killTokenStream() {
    this.tokenStream = undefined;
  }

  public createTokenStream() {
    this.tokenStream = new BehaviorSubject<any>({
      value: this.defaultColors
    });
  }

  public onTokenChanges(changes: SkyTokensChange) {
    console.log('Token changes:', changes);
  }
}
