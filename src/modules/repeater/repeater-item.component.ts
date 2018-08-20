import {
  ChangeDetectorRef,
  Component,
  Input,
  ElementRef,
  ContentChild,
  AfterContentInit
} from '@angular/core';

import {
  skyAnimationSlide
} from '../animation/slide';

import {
  SkyCheckboxChange
} from '../checkbox/checkbox.component';

import {
  SkyLogService
} from '../log/log.service';

import {
  SkyRepeaterService
} from './repeater.service';
import { SkyRepeaterItemContentComponent } from './repeater-item-content.component';

@Component({
  selector: 'sky-repeater-item',
  styleUrls: ['./repeater-item.component.scss'],
  templateUrl: './repeater-item.component.html',
  animations: [skyAnimationSlide]
})
export class SkyRepeaterItemComponent implements AfterContentInit {

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
    if (this.isCollapsible !== value) {
      this._isCollapsible = value;

      /*istanbul ignore else */
      if (!value) {
        this.updateForExpanded(true, false);
      }
    }
  }

  private _isCollapsible = true;

  private _isExpanded = true;

  private _isSelected = false;

  @ContentChild(SkyRepeaterItemContentComponent, { read: ElementRef })
  private contentElement: ElementRef;

  constructor(
    private repeaterService: SkyRepeaterService,
    private changeDetector: ChangeDetectorRef,
    private logService: SkyLogService
  ) { }

  public ngAfterContentInit() {
    this.slideForExpanded();
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
      this.slideForExpanded();
      this.changeDetector.markForCheck();
    }
  }

  public updateIsSelected(value: SkyCheckboxChange) {
    this._isSelected = value.checked;
  }

  private slideForExpanded() {
    this.slideDirection = this.isExpanded && this.contentElement &&
      this.contentElement.nativeElement.innerHTML.trim() ? 'downWithBottomPadding' : 'up';
  }
}
