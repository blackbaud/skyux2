import {
  Component
} from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  SkyTokens,
  SkyTokensChange,
  SkyTokenSelectedEventArgs
} from '../../modules/tokens';

@Component({
  selector: 'sky-tokens-demo',
  templateUrl: './tokens-demo.component.html'
})
export class SkyTokensDemoComponent {
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

  public resetColorStream() {
    if (!this.colorChanges) {
      this.createColorStream();
    }

    this.colorChanges.next({
      value: this.colors
    });
  }

  public changeColorStream() {
    if (!this.colorChanges) {
      this.createColorStream();
    }

    this.colorChanges.next({
      value: [
        { name: 'Red' },
        { name: 'White' },
        { name: 'Blue' }
      ]
    });
  }

  public destroyColorStream() {
    this.colorChanges = undefined;
  }

  public createColorStream() {
    this.colorChanges = new BehaviorSubject<SkyTokens>({
      value: this.colors
    });
  }

  public onChanges(changes: SkyTokensChange) {
    console.log('Token changes:', changes);
  }

  public onTokenSelected(args: SkyTokenSelectedEventArgs) {
    console.log('Token selected:', args);
  }

  public onFocusIndexLimitReached() {
    console.log('Last token focused.');
  }
}
