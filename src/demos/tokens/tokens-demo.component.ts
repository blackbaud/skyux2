import {
  Component,
  OnDestroy
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  SkyToken,
  SkyTokenSelectedEventArgs,
  SkyTokensMessageType,
  SkyTokensMessage
} from '../../core';

@Component({
  selector: 'sky-tokens-demo',
  templateUrl: './tokens-demo.component.html'
})
export class SkyTokensDemoComponent implements OnDestroy {
  public colors: SkyToken[];
  public filters: SkyToken[];
  public tokensController: Subject<SkyTokensMessage>;

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

  private selectedFilters = [
    { label: 'Canada' },
    { label: 'Older than 55' },
    { label: 'Employed' },
    { label: 'Added before 2018' }
  ];

  constructor() {
    this.createColors();
    this.filters = this.parseTokens(this.selectedFilters);
  }

  public ngOnDestroy(): void {
    if (this.tokensController) {
      this.tokensController.complete();
    }
  }

  public resetColors(): void {
    this.createColors();
  }

  public changeColors(): void {
    this.colors = this.parseTokens([
      { name: 'Red' },
      { name: 'White' },
      { name: 'Blue' }
    ]);
  }

  public destroyColors(): void {
    this.colors = undefined;
  }

  public createColors(): void {
    this.colors = this.parseTokens(this.defaultColors);
  }

  public onTokenSelected(args: SkyTokenSelectedEventArgs) {
    console.log('Token selected:', args);
  }

  public onFocusIndexUnderRange(): void {
    console.log('Focus index was less than zero.');
  }

  public onFocusIndexOverRange(): void {
    console.log('Focus index was greater than the number of tokens.');
  }

  public focusLastToken(): void {
    if (!this.tokensController) {
      this.tokensController = new Subject<SkyTokensMessage>();
    }

    this.tokensController.next({
      type: SkyTokensMessageType.FocusLastToken
    });
  }

  private parseTokens(data: any[]): SkyToken[] {
    return data.map((item: any) => {
      return {
        value: item
      } as SkyToken;
    });
  }
}
