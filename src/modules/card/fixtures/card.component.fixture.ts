import { Component } from '@angular/core';

import { SkyCardComponent } from '../card.component';

@Component({
  selector: 'sky-test-cmp',
  directives: [SkyCardComponent],
  template: ''
})
export class CardTestComponent {
  public cardSelected = false;

  public showCheckbox = true;
}
