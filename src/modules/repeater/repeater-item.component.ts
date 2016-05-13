import { Component, ElementRef } from '@angular/core';

import { SkyChevronComponent } from '../chevron/chevron.component';
import { SkyRepeaterService } from './repeater.service';
import { SkySlideService } from '../animation/slide.service';

@Component({
  selector: 'sky-repeater-item',
  styles: [require('./repeater-item.component.scss')],
  template: require('./repeater-item.component.html'),
  directives: [SkyChevronComponent],
  viewProviders: [SkySlideService]
})
export class SkyRepeaterItemComponent {
  public get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  public set isCollapsed(value: boolean) {
    this._isCollapsed = value;

    this.repeaterService.onItemCollapseStateChange(this);

    this.slideForCollapsed();
  }

  public isCollapsible = false;

  private _isCollapsed = false;

  constructor(
    private repeaterService: SkyRepeaterService,
    private elementRef: ElementRef,
    private slideService: SkySlideService
  ) {

  }

  public headerClick() {
    if (this.isCollapsible) {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  public chevronDirectionChange(direction: string) {
    this.isCollapsed = direction === 'down';
  }

  private slideForCollapsed(animate = true) {
    let direction = this.isCollapsed ? 'up' : 'down';
    this.slideService.slide(this.elementRef, '.sky-repeater-item-content', direction, animate);
  }
}
