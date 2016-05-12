import {Component, ContentChildren, Input, QueryList} from 'angular2/core';
import {SkyRepeaterItemComponent} from './repeater-item.component';
import {SkyRepeaterService} from './repeater.service';

@Component({
  selector: 'sky-repeater',
  styles: [require('./repeater.component.scss')],
  template: require('./repeater.component.html'),
  providers: [SkyRepeaterService]
})
export class SkyRepeaterComponent {
  private _expandMode = 'none';

  @Input()
  public set expandMode(value: string) {
    this._expandMode = value || 'none';
    this.updateForExpandMode();
  }

  @ContentChildren(SkyRepeaterItemComponent)
  private items: QueryList<SkyRepeaterItemComponent>;

  constructor(private repeaterService: SkyRepeaterService) {
    repeaterService.itemCollapseStateChange.subscribe((item: SkyRepeaterItemComponent) => {
      if (this._expandMode === 'single' && !item.isCollapsed) {
        for (let otherItem of this.items.toArray()) {
          if (otherItem !== item && !otherItem.isCollapsed) {
            otherItem.isCollapsed = true;
          }
        }
      }
    });
  }

  public isCollapsible(): boolean {
    return this._expandMode !== 'none';
  }

  private updateForExpandMode() {
    if (this.items) {
      let foundExpanded = false;
      let isCollapsible = this.isCollapsible();
      let isSingle = this._expandMode === 'single';

      for (let item of this.items.toArray()) {
        if (!isCollapsible && item.isCollapsed) {
          item.isCollapsed = false;
        } else if (isSingle && !item.isCollapsed) {
          if (foundExpanded) {
            item.isCollapsed = true;
          }

          foundExpanded = true;
        }
      }
    }
  }
}
