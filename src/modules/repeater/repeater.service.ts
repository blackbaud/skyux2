import {EventEmitter, Injectable, QueryList} from 'angular2/core';
import {SkyRepeaterItemComponent} from './repeater-item.component';

@Injectable()
export class SkyRepeaterService {
  public itemCollapseStateChange = new EventEmitter<SkyRepeaterItemComponent>();

  public onItemCollapseStateChange(item: SkyRepeaterItemComponent) {
    this.itemCollapseStateChange.emit(item);
  }
}
