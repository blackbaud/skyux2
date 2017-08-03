import { Component, Input } from '@angular/core';

import {
  style,
  state,
  trigger,
  transition,
  animate
} from '@angular/animations';

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
export class SkyVerticalTabsetHeaderComponent {

  @Input()
  public title: string;

  public open: boolean = false;

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
