import {
  Component,
  OnInit
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

import {
  Subject
} from 'rxjs';

import {
  SkyGridMessage,
  SkyGridMessageType,
  SkyGridSelectedRowsModelChange
} from '@skyux/grids';

import {
  ListSortFieldSelectorModel
} from '../../core';

@Component({
  selector: 'sky-grid-demo',
  templateUrl: './grid-demo.component.html'
})
export class SkyGridDemoComponent implements OnInit {

  // public dataForGrid: any[] = [
  //   { id: '1', count: 101, fruit: 'Apple', fruitEater: 'Anne eats apples', composite: 'Comp A' },
  //   { id: '2', count: 202, fruit: 'Banana', fruitEater: 'Ben eats bananas', composite: 'Comp B' },
  //   { id: '3', count: 303, fruit: 'Pear', fruitEater: 'Patty eats pears', composite: 'Comp C' },
  //   { id: '4', count: 404, fruit: 'Grape', fruitEater: 'George eats grapes', composite: 'Comp D' },
  //   { id: '5', count: 505, fruit: 'Banana', fruitEater: 'Becky eats bananas',
  //     composite: 'Comp E' },
  //   { id: '6', count: 606, fruit: 'Lemon', fruitEater: 'Larry eats lemons', composite: 'Comp F' },
  //   { id: '7', count: 707, fruit: 'Strawberry', fruitEater: 'Sally eats strawberries',
  //     composite: 'Comp G' }
  // ];

  // public dataForGridWithMultiselect = [
  //   { id: '1', count: '101', fruit: 'Apple', fruitEater: 'Anne eats apples', myRowId: '101' },
  //   { id: '2', count: '202', fruit: 'Banana', fruitEater: 'Ben eats bananas', myRowId: '102' },
  //   { id: '3', count: '303', fruit: 'Banana', fruitEater: 'Becky eats bananas', myRowId: '103' },
  //   { id: '4', count: '404', fruit: 'Cherry', fruitEater: 'Cat eats Cherries', myRowId: '104' },
  //   { id: '5', count: '505', fruit: 'Dragon Fruit', fruitEater: 'Dave eats dragon fruit', myRowId: '105' },
  //   { id: '6', count: '606', fruit: 'Fig', fruitEater: 'Frank eats figs', myRowId: '106' },
  //   { id: '7', count: '707', fruit: 'Grape', fruitEater: 'George eats grapes', myRowId: '107' }
  // ];

  public dataForGrid = [
    { id: '1', name: 'Niels Bohr', email: 'niels.bohr@blackbaud.com', amount: 170.75, status: 'Paid' },
    { id: '2', name: 'Ada Lovelace', email: 'ada.lovelace@blackbaud.com', amount: 114.13, status: 'Paid' },
    { id: '3', name: 'Marie Curie', email: 'marie.curie@blackbaud.com', amount: 111, status: 'Past due' },
    { id: '4', name: 'Barbara McClintock', email: 'barbara.mcclintock@blackbaud.com', amount: 84.63, status: 'Paid' },
    { id: '5', name: 'Michael Faraday', email: 'michael.faraday@blackbaud.com', amount: 83.97, status: 'Paid' },
    { id: '6', name: 'Enrico Fermi', email: 'enrico.fermi@blackbaud.com', amount: 74.5, status: 'Past due' },
    { id: '7', name: 'Mae C. Jemison', email: 'mae.jemison@blackbaud.com', amount: 70.86, status: 'Paid' }
  ];

  public dataForGridWithMultiselect = this.dataForGrid.slice(0);

  public asyncHeading = new BehaviorSubject<string>('');

  public selectedRows: string;

  public gridController = new Subject<SkyGridMessage>();

  public ngOnInit() {
    // Simulate async request:
    setTimeout(() => {
      this.asyncHeading.next('Amount');
    }, 1000);
  }

  public onSortChangeForGrid(activeSort: ListSortFieldSelectorModel) {
    this.dataForGrid = this.sortGridData(activeSort, this.dataForGrid);
  }

  public onSortChangeForMultiselectGrid(activeSort: ListSortFieldSelectorModel) {
    this.dataForGridWithMultiselect = this.sortGridData(activeSort, this.dataForGridWithMultiselect);
  }

  public onMultiselectSelectionChange(value: SkyGridSelectedRowsModelChange) {
    this.selectedRows = value.selectedRowIds.toString();
  }

  public selectAll() {
    this.sendMessage(SkyGridMessageType.SelectAll);
  }

  public clearAll() {
    this.sendMessage(SkyGridMessageType.ClearAll);
  }

  private sortGridData(activeSort: ListSortFieldSelectorModel, data: any[]) {
    const sortField = activeSort.fieldSelector;
    const descending = activeSort.descending;

    return data.sort((a: any, b: any) => {
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

  private sendMessage(type: SkyGridMessageType) {
    const message: SkyGridMessage = { type };
    this.gridController.next(message);
  }
}
