import { Component, Input, QueryList } from '@angular/core';

import { SkyTabComponent } from './tab.component';

@Component({
  selector: 'sky-tab-dropdown',
  template: require('./tab-dropdown.component.html'),
  styles: [require('./tab-shared.scss'), require('./tab-dropdown.component.scss')]
})
export class SkyTabDropdownComponent {
  @Input()
  public tabs: QueryList<SkyTabComponent>;

  public get activeTabHeading(): string {
    let activeTab = this.tabs.filter((item) => {
      return item.active;
    });

    if (activeTab.length > 0) {
      return activeTab[0].tabHeading;
    }
  }
}
