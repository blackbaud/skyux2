import { Injectable } from '@angular/core';

import { SkyVerticalTabComponent } from './vertical-tab.component';

@Injectable()
export class SkyVerticalTabsetService {

  public tabs: Array<SkyVerticalTabComponent> = [];

  public activeIndex: Number = 0;

  public addTab(tab: SkyVerticalTabComponent) {

    const index = this.tabs.length;
    tab.index = index;

    // set first tab to active
    if (this.tabs.length === 0) {
      tab.active = true;
    }

    this.tabs.push(tab);
  }

  public activateTab(tab: SkyVerticalTabComponent) {

    // unactivate active tab
    let activeTab = this.tabs.find(t => t.index === this.activeIndex);
    if (activeTab && activeTab.index !== tab.index) {
      activeTab.active = false;
    }

    this.activeIndex = tab.index;
  }
}
