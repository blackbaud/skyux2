import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

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
export class SkyRepeaterItemComponent implements AfterViewInit {
  public get isExpanded(): boolean {
    return this._isExpanded;
  }

  @Input()
  public set isExpanded(value: boolean) {
    this.updateForExpanded(value, true);
  }

  public get isCollapsible(): boolean {
    return this._isCollapsible;
  }

  public set isCollapsible(value: boolean) {
    this._isCollapsible = value;

    if (!this._isCollapsible) {
      this.updateForExpanded(true, false);
    }
  }

  private viewInitialized = false;

  private _isCollapsible = false;

  private _isExpanded = true;

  constructor(
    private repeaterService: SkyRepeaterService,
    private elementRef: ElementRef,
    private logService: SkyLogService
  ) {

  }

  public headerClick() {
    if (this.isCollapsible) {
      this.updateForExpanded(!this.isExpanded, true);
    }
  }

  public chevronDirectionChange(direction: string) {
    this.updateForExpanded(direction === 'up', true);
  }

  public ngAfterViewInit() {
    this.viewInitialized = true;
    this.slideForExpanded(false);
  }

  public updateForExpanded(value: boolean, animate: boolean) {
    if (this.isCollapsible === false && value === false) {
      this.logService.warn(
        `Setting isExpanded to false when the repeater item is not collapsible
        will have no effect.`
      );
    } else {
      this._isExpanded = value;

      this.repeaterService.onItemCollapseStateChange(this);

      if (this.viewInitialized) {
        this.slideForExpanded(animate);
      }
    }
  }

  private slideForExpanded(animate: boolean) {
    // let direction = this.isExpanded ? 'down' : 'up';
    // this.slideService.slide(this.elementRef, '.sky-repeater-item-content', direction, animate);
  }
}

