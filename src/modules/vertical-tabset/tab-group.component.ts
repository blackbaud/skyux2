import {
  Component,
  Input,
  QueryList,
  ContentChildren
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
export class SkyTabGroupComponent {

  @Input()
  public groupHeading: string;

  @Input()
  public disabled: boolean;

  private _open: boolean = false;

  public get open(): boolean {
    return !this.disabled && this._open;
  }

  @Input()
  public set open(value: boolean) {
    this._open = value;
  }

  @ContentChildren(SkyVerticalTabComponent)
  private tabs: QueryList<SkyVerticalTabComponent>;

  public clicked() {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  public openState(): string {
    if (this.open) {
      return TABSTATE_OPEN;
    } else {
      return TABSTATE_CLOSED;
    }
  }

  public subMenuOpen(): boolean {
    return this.tabs && (this.tabs.find(t => t.active) !== undefined);
  }
}
