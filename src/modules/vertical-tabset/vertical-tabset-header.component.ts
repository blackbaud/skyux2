import {
  Component,
  Input,
  QueryList,
  ContentChildren,
  OnInit,
  AfterContentInit
} from '@angular/core';

import {
  style,
  state,
  trigger,
  transition,
  animate
} from '@angular/animations';

import { SkyVerticalTabsetItemComponent } from './vertical-tabset-item.component';

const TABSTATE_OPEN: string = 'open';
const TABSTATE_CLOSED: string = 'closed';

@Component({
  selector: 'sky-vertical-tabset-header',
  templateUrl: './vertical-tabset-header.component.html',
  styleUrls: ['./vertical-tabset-header.component.scss'],
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
export class SkyVerticalTabsetHeaderComponent implements AfterContentInit {

  @Input()
  public title: string;

  public open: boolean = false;

  @ContentChildren(SkyVerticalTabsetItemComponent)
  private tabs: QueryList<SkyVerticalTabsetItemComponent>;

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
