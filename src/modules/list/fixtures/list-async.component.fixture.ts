import { Component, ViewChild, Inject } from '@angular/core';
import { SkyListComponent } from '../list.component';
import { ListFilterDataModel } from '../state/filters/filter-data.model';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'sky-test-cmp',
  template: require('./list-async.component.fixture.html')
})
export class ListAsyncTestComponent {
  @ViewChild(SkyListComponent) public list: SkyListComponent;

  constructor(@Inject('items') public items: any) {
  }

  public searchAsync(searchText: string) {
    let itemsArray = [
      { id: '100', column1: '101', column2: 'Banana Shake',
        column3: moment().add(10, 'minute') },
      { id: '200', column1: '201', column2: 'Banana Split',
        column3: moment().add(60, 'minute') },
      { id: '300', column1: '301', column2: 'Banana Cream Pie',
        column3: moment().add(15, 'minute') }
    ];
    let bs = new BehaviorSubject<Array<any>>(itemsArray);

    return bs.asObservable();
  }

  public itemSearch(item: any, searchText: string) {
    return item.column2.toLowerCase().indexOf(searchText) !== -1 ?
      item.column2.toLowerCase() : -1;
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
