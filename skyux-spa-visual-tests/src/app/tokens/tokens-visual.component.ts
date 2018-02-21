import {
  Component
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  SkyTokens,
  SkyTokensChange,
  SkyTokenSelectedEventArgs
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'tokens-visual',
  templateUrl: './tokens-visual.component.html'
})
export class TokensVisualComponent {
  public colorChanges: BehaviorSubject<SkyTokens>;
  public filterChanges: BehaviorSubject<SkyTokens>;

  private colors = [
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

  private filters = [
    { label: 'Canada' },
    { label: 'Older than 55' },
    { label: 'Employed' },
    { label: 'Added before 2018' }
  ];

  constructor() {
    this.createColorStream();

    this.filterChanges = new BehaviorSubject<SkyTokens>({
      value: this.filters
    });
  }

  public createColorStream() {
    this.colorChanges = new BehaviorSubject<SkyTokens>({
      value: this.colors
    });
  }
}
