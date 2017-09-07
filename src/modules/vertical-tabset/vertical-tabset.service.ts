import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable, ElementRef } from '@angular/core';
import { SkyVerticalTabComponent } from './vertical-tab.component';

@Injectable()
export class SkyVerticalTabsetService {

  public tabs: Array<SkyVerticalTabComponent> = [];
  public tabClicked = new BehaviorSubject(0);
  public activeIndex: Number = 0;

  public hidingTabs = new BehaviorSubject(false);
  public showingTabs = new BehaviorSubject(false);

  public addTab(tab: SkyVerticalTabComponent) {
    const index = this.tabs.length;
    tab.index = index;

    this.tabs.push(tab);

    if (tab.active) {
      this.activateTab(tab);
    }
  }

  public activateTab(tab: SkyVerticalTabComponent) {

    // unactivate active tab
    let activeTab = this.tabs.find(t => t.index === this.activeIndex);
    if (activeTab && activeTab.index !== tab.index) {
      activeTab.active = false;
      activeTab.tabDeactivated();
    }

    this.activeIndex = tab.index;
    this.tabClicked.next(tab.index);
  }

  public activeTabContent(): ElementRef {
    let activeTab = this.tabs.find(t => t.index === this.activeIndex);

    if (activeTab) {
      return activeTab.tabContent;
    } else {
      return undefined;
    }
  }

  public tabsHidden() {
    this.hidingTabs.next(true);
  }

  public tabsShown() {
    this.showingTabs.next(true);
  }
}
