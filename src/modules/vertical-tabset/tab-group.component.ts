import {
  Component,
  Input,
  QueryList,
  ContentChildren,
  AfterContentInit
} from '@angular/core';

import {
  style,
  state,
  trigger,
  transition,
  animate
} from '@angular/animations';

import { SkyVerticalTabComponent } from './vertical-tab.component';

const TABSTATE_OPEN: string = 'open';
const TABSTATE_CLOSED: string = 'closed';

@Component({
  selector: 'sky-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  animations: [trigger('tabState', [
    state(TABSTATE_OPEN, style({
      height: '*',
      visibility: 'visible'
    })),
    state(TABSTATE_CLOSED, style({
      height: '0',
      visibility: 'hidden'
    })),
    transition(
      `${TABSTATE_OPEN} <=> ${TABSTATE_CLOSED}`,
      animate('300ms ease-in-out')
    )
  ])]
})
export class SkyTabGroupComponent implements AfterContentInit {

  @Input()
  public groupHeading: string;

  public open: boolean = false;

  @ContentChildren(SkyVerticalTabComponent)
  private tabs: QueryList<SkyVerticalTabComponent>;

  public ngAfterContentInit() {
    // open group if child item is active
    let activeTab = this.tabs && this.tabs.find(t => t.active === true);
    if (activeTab) {
      this.open = true;
    }
  }

  public clicked() {
    this.open = !this.open;
  }

  public openState(): string {
    if (this.open) {
      return TABSTATE_OPEN;
    } else {
      return TABSTATE_CLOSED;
    }
  }
}
