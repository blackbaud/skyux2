import { Component, ViewChild, Inject } from '@angular/core';
import { SkyListComponent } from '../list.component';
import { ListFilterDataModel } from '../state/filters/filter-data.model';
import { BehaviorSubject } from 'rxjs';
import { SkyListInMemoryDataProvider } from '../../list-data-provider-in-memory';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-empty.component.fixture.html')
})
export class ListEmptyTestComponent {
  @ViewChild(SkyListComponent) public list: SkyListComponent;

  constructor(
    @Inject('items') public items: any,
    public dataProvider: SkyListInMemoryDataProvider
  ) {
  }

  public get options() {
    let bs = new BehaviorSubject<Array<any>>(['banana', 'apple']);
    return bs.asObservable();
  }

  public filterOnStatus(item: any, filter: ListFilterDataModel) {
    return item.data.column2 !== undefined ?
      item.data.column2.toLowerCase().indexOf(filter.value) !== -1 : false;
  }
}
