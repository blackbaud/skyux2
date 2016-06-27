import {
  Component,
  QueryList,
  ContentChildren,
  forwardRef
} from '@angular/core';

import { SkyTabButtonComponent } from './tab-button.component';
import { SkyTabComponent } from './tab.component';

@Component({
  selector: 'sky-tabset',
  directives: [SkyTabButtonComponent],
  styles: [require('./tabset.component.scss')],
  template: require('./tabset.component.html')
})
export class SkyTabsetComponent {
  @ContentChildren(forwardRef(() => SkyTabComponent))
  private tabs: QueryList<SkyTabComponent>;

  public selectTab(tab: SkyTabComponent) {
    this.tabs.forEach((existingTab) => {
      existingTab.active = false;
    });

    tab.active = true;
  }

  public tabCloseClick(tab: SkyTabComponent) {
    tab.close.emit(undefined);
  }

  public removeTab(tab: SkyTabComponent) {
    let tabs = this.tabs.toArray();
    let active = tab.active;
    let tabIndex = tabs.indexOf(tab);

    if (active && tabs[tabIndex + 1]) {
      let newActiveTab = tabs[tabIndex + 1] || tabs[tabIndex - 1];

      if (newActiveTab) {
        this.selectTab(newActiveTab);
      }
    }
  }
}
