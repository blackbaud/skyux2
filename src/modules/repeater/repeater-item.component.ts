import {
  Component,
  Input
} from '@angular/core';

import { skyAnimationSlide } from '../animation/slide';

import { SkyRepeaterService } from './repeater.service';
import { SkyLogService } from '../log/log.service';
import { SkyCheckboxChange } from '../checkbox/checkbox.component';

@Component({
  selector: 'sky-repeater-item',
  styleUrls: ['./repeater-item.component.scss'],
  templateUrl: './repeater-item.component.html',
  animations: [skyAnimationSlide]
})
export class SkyRepeaterItemComponent {
  public get isExpanded(): boolean {
    return this._isExpanded;
  }

  @Input()
  public set isExpanded(value: boolean) {
    this.updateForExpanded(value, true);
  }

  public get isSelected(): boolean {
    return this._isSelected;
  }

  @Input()
  public selectable: boolean = false;

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

  private _isSelected = false;

  constructor(
    private repeaterService: SkyRepeaterService,
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

  public updateIsSelected(value: SkyCheckboxChange) {
    this._isSelected = value.checked;
  }

  private slideForExpanded(animate: boolean) {
    this.slideDirection = this.isExpanded ? 'down' : 'up';
  }
}
