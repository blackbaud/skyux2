import {
  animate,
  Component,
  ElementRef,
  Input,
  trigger,
  state,
  style,
  transition
} from '@angular/core';

import { SkyRepeaterService } from './repeater.service';
import { SkyLogService } from '../log/log.service';

@Component({
  selector: 'sky-repeater-item',
  styleUrls: ['./repeater-item.component.scss'],
  templateUrl: './repeater-item.component.html',
  animations: [trigger('slide', [
    state('down', style({
      overflow: 'hidden',
      height: '*'
    })),
    state('up', style({
      overflow: 'hidden',
      height: 0
    })),
    transition(
      'up <=> down',
      animate('150ms ease-in')
    )
  ])]
})
export class SkyRepeaterItemComponent {
  public get isExpanded(): boolean {
    return this._isExpanded;
  }

  @Input()
  public set isExpanded(value: boolean) {
    this.updateForExpanded(value, true);
  }

  public slideDirection: string;

  public get isCollapsible(): boolean {
    return this._isCollapsible;
  }

  public set isCollapsible(value: boolean) {
    if (this._isCollapsible !== value) {
      this._isCollapsible = value;

      /*istanbul ignore else */
      if (!this._isCollapsible) {
        this.updateForExpanded(true, false);
      }
    }
  }

  private _isCollapsible = true;

  private _isExpanded = true;

  constructor(
    private repeaterService: SkyRepeaterService,
    private elementRef: ElementRef,
    private logService: SkyLogService
  ) {
    this.slideForExpanded(false);
  }

  public headerClick() {
    if (this.isCollapsible) {
      this.updateForExpanded(!this.isExpanded, true);
    }
  }

  public chevronDirectionChange(direction: string) {
    this.updateForExpanded(direction === 'up', true);
  }

  public updateForExpanded(value: boolean, animate: boolean) {
    if (this.isCollapsible === false && value === false) {
      this.logService.warn(
        `Setting isExpanded to false when the repeater item is not collapsible
        will have no effect.`
      );
    } else if (this._isExpanded !== value) {
      this._isExpanded = value;

      this.repeaterService.onItemCollapseStateChange(this);
      this.slideForExpanded(animate);
    }
  }

  private slideForExpanded(animate: boolean) {
    this.slideDirection = this.isExpanded ? 'down' : 'up';
  }
}
