import {
  Component,
  OnInit
} from '@angular/core';

import {
  SkyGridMessage,
  SkyGridSelectedRowsModelChange
} from '@skyux/grids';

import {
  ListSortFieldSelectorModel
} from '@skyux/list-builder-common';

import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

import {
  Subject
} from 'rxjs/Subject';

@Component({
  selector: 'sky-grid-demo',
  templateUrl: './grid-demo.component.html'
})
export class SkyGridDemoComponent implements OnInit {

  public data = [
    { id: '1', name: 'Niels Bohr', email: 'niels.bohr@example.com', amount: 170.75, status: 'Paid' },
    { id: '2', name: 'Ada Lovelace', email: 'ada.lovelace@example.com', amount: 114.13, status: 'Paid' },
    { id: '3', name: 'Marie Curie', email: 'marie.curie@example.com', amount: 111, status: 'Past due' },
    { id: '4', name: 'Barbara McClintock', email: 'barbara.mcclintock@example.com', amount: 84.63, status: 'Paid' },
    { id: '5', name: 'Michael Faraday', email: 'michael.faraday@example.com', amount: 83.97, status: 'Paid' },
    { id: '6', name: 'Enrico Fermi', email: 'enrico.fermi@example.com', amount: 74.5, status: 'Past due' },
    { id: '7', name: 'Mae C. Jemison', email: 'mae.jemison@example.com', amount: 70.86, status: 'Paid' }
  ];

  public dataForMultiselect = this.data.slice(0);

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
    this.data = this.sortGridData(activeSort, this.data);
  }

  public onSortChangeForMultiselectGrid(activeSort: ListSortFieldSelectorModel) {
    this.dataForMultiselect = this.sortGridData(activeSort, this.dataForMultiselect);
  }

  public onMultiselectSelectionChange(value: SkyGridSelectedRowsModelChange) {
    this.selectedRows = value.selectedRowIds.toString();
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
}
