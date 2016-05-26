import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';

import { SkyRepeaterItemComponent } from './repeater-item.component';
import { SkyRepeaterService } from './repeater.service';

@Component({
  selector: 'sky-repeater',
  styles: [require('./repeater.component.scss')],
  template: require('./repeater.component.html'),
  providers: [SkyRepeaterService]
})
export class SkyRepeaterComponent implements AfterContentInit {
  @Input()
  public set expandMode(value: string) {
    this._expandMode = value;
    this.updateForExpandMode();
  }

  public get expandMode(): string {
    return this._expandMode || 'none';
  }

  @ContentChildren(SkyRepeaterItemComponent)
  public items: QueryList<SkyRepeaterItemComponent>;

  private _expandMode = 'none';

  constructor(private repeaterService: SkyRepeaterService) {
    repeaterService.itemCollapseStateChange.subscribe((item: SkyRepeaterItemComponent) => {
      if (this.expandMode === 'single' && item.isExpanded) {
        for (let otherItem of this.items.toArray()) {
          if (otherItem !== item && otherItem.isExpanded) {
            otherItem.isExpanded = false;
          }
        }
      }
    });
  }

  public isCollapsible(): boolean {
    return this.expandMode !== 'none';
  }

  public ngAfterContentInit() {
    // HACK: Have to use setTimeout() here to avoid error described in this issue:
    // https://github.com/angular/angular/issues/6005
    setTimeout(() => {
      this.updateForExpandMode();
    }, 0);

    this.items.changes.subscribe(() => {
      this.updateForExpandMode();
    });
  }

  private updateForExpandMode() {
    if (this.items) {
      let foundExpanded = false;
      let isCollapsible = this.isCollapsible();
      let isSingle = this.expandMode === 'single';

      this.items.forEach((item) => {
        item.isCollapsible = isCollapsible;

        if (isSingle && item.isExpanded) {
          if (foundExpanded) {
            item.updateForExpanded(false, false);
          }

          foundExpanded = true;
        }
      });
    }
  }
}
