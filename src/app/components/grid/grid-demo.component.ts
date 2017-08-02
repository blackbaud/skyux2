import { Component } from '@angular/core';
import { ListSortFieldSelectorModel } from '../../../core';

@Component({
  selector: 'sky-grid-demo',
  templateUrl: './grid-demo.component.html'
})
export class SkyGridDemoComponent {
  public items: any[] = [
    { id: '1', column1: 101, column2: 'Apple', column3: 'Anne eats apples', composite: 'Comp A',
      consumptionCount: 1, initialCount: 10},
    { id: '2', column1: 202, column2: 'Banana', column3: 'Ben eats bananas', composite: 'Comp B',
      consumptionCount: 2, initialCount: 20},
    { id: '3', column1: 303, column2: 'Pear', column3: 'Patty eats pears', composite: 'Comp C',
      consumptionCount: 3, initialCount: 30},
    { id: '4', column1: 404, column2: 'Grape', column3: 'George eats grapes', composite: 'Comp D',
      consumptionCount: 4, initialCount: 40},
    { id: '5', column1: 505, column2: 'Banana', column3: 'Becky eats bananas', composite: 'Comp E',
      consumptionCount: 5, initialCount: 50},
    { id: '6', column1: 606, column2: 'Lemon', column3: 'Larry eats lemons', composite: 'Comp F',
      consumptionCount: 6, initialCount: 60},
    { id: '7', column1: 707, column2: 'Strawberry', column3: 'Sally eats strawberries',
      composite: 'Comp G',
      consumptionCount: 7, initialCount: 70}
  ];

  public sortChanged(activeSort: ListSortFieldSelectorModel) {
    let sortField = activeSort.fieldSelector;
    let descending = activeSort.descending;
    this.items = this.items.sort((a: any, b: any) => {
      let value1 = a[sortField];
      let value2 = b[sortField];

      if (value1 && typeof value1 === 'string') {
        value1 = value1.toLowerCase();
      }

      if (value2 && typeof value2 === 'string') {
        value2 = value2.toLowerCase();
      }
      if (value1 === value2) {
        return 0;
      }

      let result = value1 > value2 ? 1 : -1;

      if (descending) {
        result *= -1;
      }
      return result;
    }).slice();
  }
}
