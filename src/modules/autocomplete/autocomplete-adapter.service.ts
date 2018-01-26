import {
  ElementRef,
  Injectable,
  Renderer2
} from '@angular/core';

import {
  SkyWindowRefService
} from '../window';

@Injectable()
export class SkyAutocompleteAdapterService {
  constructor(
    private renderer: Renderer2,
    private windowRef: SkyWindowRefService
  ) { }

  public handleKeyDown(event: KeyboardEvent) {
    const key = event.key.toLowerCase();

    /* tslint:disable-next-line:switch-default */
    switch (key) {
      // case 'arrowdown':
      // Tell component to focus next item
      // event.preventDefault();
      // break;

      // case 'arrowup':
      // Tell component to focus previous item
      // event.preventDefault();
      // break;

      // case 'tab':
      // case 'enter':
      // if (this.hasSearchResults()) {
      //   this.selectActiveSearchResult();
      //   event.preventDefault();
      // }
      // break;

      // case 'escape':
      // this.closeDropdown();
      // event.preventDefault();
      // event.stopPropagation();
      // break;
    }
  }
}
