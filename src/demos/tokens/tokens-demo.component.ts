import {
  Component
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sky-tokens-demo',
  templateUrl: './tokens-demo.component.html'
})
export class SkyTokensDemoComponent {
  public tokenStream: BehaviorSubject<any>;

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
    this.tokenStream = new BehaviorSubject<any>({
      tokens: this.defaultColors
    });
  }

  public resetTokens() {
    console.log('token stream, next');
    this.tokenStream.next({
      tokens: this.defaultColors
    });
  }
}
