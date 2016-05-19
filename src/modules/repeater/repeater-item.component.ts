import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

import { SkyChevronComponent } from '../chevron/chevron.component';
import { SkyRepeaterService } from './repeater.service';
import { SkySlideService } from '../animation/slide.service';

@Component({
  selector: 'sky-repeater-item',
  styles: [require('./repeater-item.component.scss')],
  template: require('./repeater-item.component.html'),
  directives: [SkyChevronComponent],
  viewProviders: [SkySlideService],
  providers: [SkyRepeaterService]
})
export class SkyRepeaterItemComponent implements AfterViewInit {
  public get isExpanded(): boolean {
    return this._isExpanded;
  }

  @Input()
  public set isExpanded(value: boolean) {
    this._isExpanded = value;

    this.repeaterService.onItemCollapseStateChange(this);

    if (this.viewInitialized) {
      this.slideForCollapsed();
    }
  }

  public isCollapsible = false;

  private viewInitialized = false;

  private _isExpanded = true;

  constructor(
    private repeaterService: SkyRepeaterService,
    private elementRef: ElementRef,
    private slideService: SkySlideService
  ) {

  }

  public headerClick() {
    if (this.isCollapsible) {
      this.isExpanded = !this.isExpanded;
    }
  }

  public chevronDirectionChange(direction: string) {
    this.isExpanded = direction === 'up';
  }

  public ngAfterViewInit() {
    this.viewInitialized = true;
    this.slideForCollapsed(false);
  }

  private slideForCollapsed(animate = true) {
    let direction = this.isExpanded ? 'down' : 'up';
    this.slideService.slide(this.elementRef, '.sky-repeater-item-content', direction, animate);
  }
}
