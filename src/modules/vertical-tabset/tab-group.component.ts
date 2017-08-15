import {
  Component,
  Input,
  QueryList,
  ContentChildren,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  style,
  trigger,
  transition,
  animate
} from '@angular/animations';

import { SkyVerticalTabComponent } from './vertical-tab.component';

@Component({
  selector: 'sky-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger(
      'tabAnimate', [
        transition(':enter', [
          style({
            height: '0',
            visibility: 'hidden'
          }),
          animate('350ms', style({
            height: '*',
            visibility: 'visible'
          }))
        ]),
        transition(':leave', [
          style({
            height: '*',
            visibility: 'visible'
          }),
          animate('350ms', style({
            height: '0',
            visibility: 'hidden'
          }))
        ])
      ]
    )
  ]
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

  public groupClicked() {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  public subMenuOpen(): boolean {
    return this.tabs && (this.tabs.find(t => t.active) !== undefined);
  }
}
