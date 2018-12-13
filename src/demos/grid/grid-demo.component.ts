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

  public dataForGrid: any[] = [
    { id: '1', column1: 101, column2: 'Apple', column3: 'Anne eats apples', composite: 'Comp A' },
    { id: '2', column1: 202, column2: 'Banana', column3: 'Ben eats bananas', composite: 'Comp B' },
    { id: '3', column1: 303, column2: 'Pear', column3: 'Patty eats pears', composite: 'Comp C' },
    { id: '4', column1: 404, column2: 'Grape', column3: 'George eats grapes', composite: 'Comp D' },
    { id: '5', column1: 505, column2: 'Banana', column3: 'Becky eats bananas',
      composite: 'Comp E' },
    { id: '6', column1: 606, column2: 'Lemon', column3: 'Larry eats lemons', composite: 'Comp F' },
    { id: '7', column1: 707, column2: 'Strawberry', column3: 'Sally eats strawberries',
      composite: 'Comp G' }
  ];

  public dataForGridWithMultiselect = [
    { id: '1', column1: '1', column2: 'Apple', column3: 'aa', myRowId: '101' },
    { id: '2', column1: '01', column2: 'Banana', column3: 'bb', myRowId: '102' },
    { id: '3', column1: '11', column2: 'Banana', column3: 'cc', myRowId: '103' },
    { id: '4', column1: '12', column2: 'Daikon', column3: 'dd', myRowId: '104' },
    { id: '5', column1: '13', column2: 'Edamame', column3: 'ee', myRowId: '105' },
    { id: '6', column1: '20', column2: 'Fig', column3: 'ff', myRowId: '106' },
    { id: '7', column1: '21', column2: 'Grape', column3: 'gg', myRowId: '107' }
  ];

  public asyncHeading = new BehaviorSubject<string>('');

  public selectedRows: string;

  public gridController = new Subject<SkyGridMessage>();

  public ngOnInit() {
    // Simulate async request:
    setTimeout(() => {
      this.asyncHeading.next('Column1');
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
