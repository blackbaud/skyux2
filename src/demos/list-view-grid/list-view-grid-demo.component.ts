import {
  Component
} from '@angular/core';

import 'rxjs/add/observable/of';

import {
  SkyGridSelectedRowsModelChange
} from '@skyux/grids';

@Component({
  selector: 'sky-list-view-grid-demo',
  templateUrl: './list-view-grid-demo.component.html'
})
export class SkyListViewGridDemoComponent {

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

  public onHelpOpened(helpKey: string): void {
    console.log(
      `Modal header help was invoked with the following help key: ${helpKey}`
    );
  }

  public onSelectedColumnIdsChange(selectedColumnIds: string[]) {
    console.log(selectedColumnIds);
  }

  public onSelectedIdsChange(selectedRowsChange: Map<string, boolean>): void {
    console.log(selectedRowsChange);
  }
}
