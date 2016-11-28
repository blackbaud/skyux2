import { Component } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { ListFilterDataModel } from '../../../modules/list/state/filters/filter-data.model';

@Component({
  selector: 'sky-list-filters-demo-combo',
  templateUrl: './list-filters-demo-combo.component.html'
})
export class SkyListFiltersDemoComboComponent {
  public items: Observable<any> = Observable.of([
    { id: '1', column1: 101, column2: 'Apple', column3: 'Anne eats apples' },
    { id: '2', column1: 202, column2: 'Banana', column3: 'Ben eats bananas' },
    { id: '3', column1: 303, column2: 'Pear', column3: 'Patty eats pears' },
    { id: '4', column1: 404, column2: 'Grape', column3: 'George eats grapes' },
    { id: '5', column1: 505, column2: 'Banana', column3: 'Becky eats bananas' },
    { id: '6', column1: 606, column2: 'Lemon', column3: 'Larry eats lemons' },
    { id: '7', column1: 707, column2: 'Strawberry', column3: 'Sally eats strawberries' }
  ]);

  public get optionsColumn2() {
    let bs = new BehaviorSubject<Array<any>>(['banana', 'apple']);
    return bs.asObservable();
  }

  public get optionsColumn1() {
    let bs = new BehaviorSubject<Array<any>>([101, 404, 606]);
    return bs.asObservable();
  }

  public filterOnColumn2(item: any, filter: ListFilterDataModel) {
    return item.data.column2 !== undefined ?
      item.data.column2.toLowerCase().indexOf(filter.value) !== -1 : false;
  }

  public filterOnColumn1(item: any, filter: ListFilterDataModel) {
    return item.data.column1 !== undefined ?
      item.data.column1 === filter.value : false;
  }
}
