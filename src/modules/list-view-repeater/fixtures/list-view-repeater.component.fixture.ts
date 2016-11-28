import { Component, ViewChild } from '@angular/core';
import { SkyListViewRepeaterComponent } from '../list-view-repeater.component';
import { ListItemModel } from '../../list/state/items/item.model';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-view-repeater.component.fixture.html')
})
export class ListViewRepeaterTestComponent {
  @ViewChild(SkyListViewRepeaterComponent) public repeater: SkyListViewRepeaterComponent;

  public itemSearch(item: ListItemModel, searchText: string) {
    return false;
  }
}
