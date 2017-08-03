import { Injectable } from '@angular/core';

import { SkyVerticalTabsetItemComponent } from './vertical-tabset-item.component';

@Injectable()
export class SkyVerticalTabsetService {

  public tabs: Array<SkyVerticalTabsetItemComponent> = [];

  public activeIndex: Number = 0;

  public addTab(tab: SkyVerticalTabsetItemComponent) {
    const index = this.tabs.length + 1;
    tab.index = index;

    // set first tab to active
    if (this.tabs.length === 0) {
      tab.active = true;
    }

    this.tabs.push(tab);
  }

  public activateTab(tab: SkyVerticalTabsetItemComponent) {
    // unactivate active tab tab
    let currentTab = this.tabs.find(t => t.index === this.activeIndex);
    if (currentTab) {
      currentTab.active = false;
    }

    this.activeIndex = tab.index;
  }
}
