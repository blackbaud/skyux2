import {
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';

import {
  Subject
} from 'rxjs/Subject';

import {
  SkyDropdownItemComponent
} from './dropdown-item.component';

@Component({
  selector: 'sky-dropdown-menu',
  templateUrl: 'dropdown-menu.component.html'
})
export class SkyDropdownMenuComponent {
  public selectedIndex = -1;
  public selectionChanged: Subject<any> = new Subject<any>();

  @ContentChildren(SkyDropdownItemComponent)
  public items: QueryList<SkyDropdownItemComponent>;

  public selectPreviousItem() {
    this.selectedIndex--;

    if (this.selectedIndex < 0) {
      this.selectedIndex = this.items.length - 1;
    }

    this.focusSelectedItem();
    this.selectionChanged.next(this.selectedIndex);
  }

  public selectNextItem() {
    this.selectedIndex++;

    if (this.selectedIndex >= this.items.length) {
      this.selectedIndex = 0;
    }

    this.focusSelectedItem();
    this.selectionChanged.next(this.selectedIndex);
  }

  public resetSelectedIndex() {
    this.selectedIndex = -1;
  }

  private focusSelectedItem() {
    const item = this.items.toArray()[this.selectedIndex];

    item.focusElement();
  }
}
