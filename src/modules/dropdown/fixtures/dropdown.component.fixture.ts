import { Component } from '@angular/core';

import { SkyDropdownComponent, SkyDropdownItemComponent } from '../';

@Component({
  selector: 'sky-test-cmp',
  template: `
<sky-dropdown [buttonType]="buttonType">
  <sky-dropdown-button>
    Show dropdown
  </sky-dropdown-button>
  <sky-dropdown-menu>
    <sky-dropdown-item>
      test
    </sky-dropdown-item>
  </sky-dropdown-menu>
</sky-dropdown>
  `,
  directives: [SkyDropdownComponent, SkyDropdownItemComponent]
})
export class DropdownTestComponent {
  public buttonType: String;
}
