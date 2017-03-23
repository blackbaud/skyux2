import { Component } from '@angular/core';

import {
  SkyModalService,
  SkyModalCloseArgs
} from '../../../core';

import { SkyFilterDemoModalComponent } from './filter-demo-modal.component';
import { SkyFilterDemoModalContext } from './filter-demo-modal-context';

@Component({
  selector: 'sky-filter-demo',
  templateUrl: './filter-demo.component.html'
})
export class SkyFilterDemoComponent {

  public appliedFilters: Array<any> = [];

  constructor(private modal: SkyModalService) { }

  public filterButtonClicked() {
    let modalInstance = this.modal.open(
        SkyFilterDemoModalComponent,
        [{
          provide: SkyFilterDemoModalContext,
          useValue: {
            appliedFilters: this.appliedFilters
          }
        }]);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') {
        this.appliedFilters = result.data.slice();
      }
    });
  }

  public onDismiss(index: number) {
    this.appliedFilters.splice(index, 1);
  }
}
