import { Component } from '@angular/core';

import { SkyDropdownComponent, SkyDropdownItemComponent } from '../';

@Component({
  selector: 'sky-test-cmp',
  template: require('./dropdown.component.fixture.html'),
  directives: [SkyDropdownComponent, SkyDropdownItemComponent]
})
export class DropdownTestComponent {
  public buttonType: String;
}
