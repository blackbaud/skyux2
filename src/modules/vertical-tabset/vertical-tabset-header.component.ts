import { Component, Input } from '@angular/core';

import {
  style,
  state,
  trigger,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'sky-vertical-tabset-header',
  templateUrl: './vertical-tabset-header.component.html',
  styleUrls: ['./vertical-tabset-header.component.scss'],
  animations: [trigger('tabState', [
    state('open', style({
      height: '*',
      visibility: 'visible'
    })),
    state('closed', style({
      height: '0',
      visibility: 'hidden'
    })),
    transition(
      'open <=> closed',
      animate('350ms linear')
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
      return 'open';
    } else {
      return 'closed';
    }
  }
}
