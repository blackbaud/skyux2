import {
  Component,
  ViewChild,
  TemplateRef,
  ContentChildren,
  QueryList,
  ViewChildren
} from '@angular/core';

import { SkyGridComponent } from '../grid.component';

import {
  ListSortFieldSelectorModel
} from '../../list/state';

import {
  SkyGridColumnWidthModelChange,
  SkyGridSelectedRowsModelChange
} from '../types';

const moment = require('moment');

@Component({
  selector: 'sky-test-cmp',
  template: require('./grid.component.fixture.html')
})
export class GridTestComponent {
  @ViewChild(SkyGridComponent)
  public grid: SkyGridComponent;

  @ContentChildren(TemplateRef)
  public templates: QueryList<TemplateRef<any>>;

  @ViewChildren(TemplateRef)
  public viewtemplates: QueryList<TemplateRef<any>>;

  public hasToolbar = false;
  public searchedData: any;
  public searchText: string;
  public activeSortSelector: ListSortFieldSelectorModel;
  public sortField: ListSortFieldSelectorModel;
  public columnWidthsChange: Array<SkyGridColumnWidthModelChange>;
  public fitType: string = 'scroll';
  public rowSelectId: string;
  public selectedRowsChange: SkyGridSelectedRowsModelChange;

  public selectedColumnIds: string[] = [
    'column1',
    'column2',
    'column3',
    'column4',
    'column5'
  ];

  public data: any[] = [
    {
      id: '1',
      column1: '1',
      column2: 'Apple',
      column3: 1,
      column4: moment().add(1, 'minute')
    },
    {
      id: '2',
      column1: '01',
      column2: 'Banana',
      column3: 1,
      column4: moment().add(6, 'minute'),
      column5: 'test'
    },
    {
      id: '3',
      column1: '11',
      column2: 'Carrot',
      column3: 11,
      column4: moment().add(4, 'minute')
    },
    {
      id: '4',
      column1: '12',
      column2: 'Daikon',
      column3: 12,
      column4: moment().add(2, 'minute')
    },
    {
      id: '5',
      column1: '13',
      column2: 'Edamame',
      column3: 13,
      column4: moment().add(5, 'minute')
    },
    {
      id: '6',
      column1: '20',
      column2: 'Fig',
      column3: 20,
      column4: moment().add(3, 'minute')
    },
    {
      id: '7',
      column1: '21',
      column2: 'Grape',
      column3: 21,
      column4: moment().add(7, 'minute')
    }
  ];

  public searchFunction: (data: any, searchText: string) => boolean =
    (data: any, searchText: string) => {
      this.searchedData = data;
      this.searchText = searchText;
      return true;
    }

  public onSort(sortSelector: ListSortFieldSelectorModel) {
    const sortField = sortSelector.fieldSelector;
    const descending = sortSelector.descending;

    this.data = this.data.sort((a: any, b: any) => {
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

    this.activeSortSelector = sortSelector;
  }

  public onResize(columnWidths: Array<SkyGridColumnWidthModelChange>) {
    this.columnWidthsChange = columnWidths;
  }

  public onMultiselectChange(selectedRows: SkyGridSelectedRowsModelChange) {
    this.selectedRowsChange = selectedRows;
  }
}
