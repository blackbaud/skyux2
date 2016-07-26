import { Component, ElementRef, Input } from '@angular/core';

import slideAnimation from '../animation/slide';
import { SkyChevronComponent } from '../chevron/chevron.component';
import { SkyRepeaterService } from './repeater.service';
import { SkyLogService } from '../log/log.service';

@Component({
  selector: 'sky-repeater-item',
  styles: [require('./repeater-item.component.scss')],
  template: require('./repeater-item.component.html'),
  directives: [SkyChevronComponent],
  providers: [SkyLogService],
  animations: [slideAnimation]
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
    } else {
      if (this._isExpanded !== value) {
        this._isExpanded = value;

        this.repeaterService.onItemCollapseStateChange(this);
        this.slideForExpanded(animate);
      }
    }
  }

  private slideForExpanded(animate: boolean) {
    this.slideDirection = this.isExpanded ? 'down' : 'up';
  }
}
