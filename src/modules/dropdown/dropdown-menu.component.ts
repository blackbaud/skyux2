import {
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';

import {
  SkyDropdownItemComponent
} from './dropdown-item.component';

@Component({
  selector: 'sky-dropdown-menu',
  templateUrl: 'dropdown-menu.component.html'
})
export class SkyDropdownMenuComponent {
  public selectedIndex = -1;

  @ContentChildren(SkyDropdownItemComponent)
  public itemComponents: QueryList<SkyDropdownItemComponent>;

  public selectPreviousItem() {
    this.selectedIndex--;

    if (this.selectedIndex < 0) {
      this.selectedIndex = this.itemComponents.length - 1;
    }

    this.focusSelectedItem();
  }

  public selectNextItem() {
    this.selectedIndex++;

    if (this.selectedIndex >= this.itemComponents.length) {
      this.selectedIndex = 0;
    }

    this.focusSelectedItem();
  }

  public resetSelectedIndex() {
    this.selectedIndex = -1;
  }

  private focusSelectedItem() {
    const item = this.itemComponents.toArray()[this.selectedIndex];

    if (item) {
      item.focusElement();
    }
  }
}
