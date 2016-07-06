import {
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';

import { SkyDropdownComponent } from '../dropdown/dropdown.component';
import { SkyTabComponent } from './tab.component';

@Component({
  selector: 'sky-tab-dropdown',
  template: require('./tab-dropdown.component.html'),
  styles: [require('./tab-dropdown.component.scss')],
  directives: [SkyDropdownComponent]
})
export class SkyTabDropdownComponent {
  @Input()
  public tabs: QueryList<SkyTabComponent>;

  @Output()
  public tabClick = new EventEmitter<SkyTabComponent>();

  @Output()
  public closeClick = new EventEmitter<SkyTabComponent>();

  public get activeTabHeading(): string {
    let activeTab = this.tabs.filter((item) => {
      return item.active;
    });

    if (activeTab.length > 0) {
      return activeTab[0].tabHeading;
    }
  }

  public selectTab(tab: SkyTabComponent) {
    this.tabClick.emit(tab);
  }

  public closeTab(tab: SkyTabComponent) {
    this.closeClick.emit(tab);
  }
}
