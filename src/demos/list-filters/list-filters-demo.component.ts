import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import {
  SkyModalService,
  SkyModalCloseArgs,
  ListFilterModel
} from '@blackbaud/skyux/dist/core';

import { SkyListFiltersModalDemoComponent } from './list-filters-demo-modal.component';
import { SkyListFiltersModalDemoContext } from './list-filters-demo-modal-context';

@Component({
  selector: 'sky-list-filters-demo',
  templateUrl: './list-filters-demo.component.html'
})
export class SkyListFiltersDemoComponent {
  public listFilters: Array<ListFilterModel> = [];
  public modalFilters: Array<ListFilterModel> = [];

  public items: Observable<any> = Observable.of([
    {
      id: 0,
      name: 'Orange',
      description: 'A round, orange fruit.',
      type: 'citrus',
      color: 'orange'
    },
    {
      id: 1,
      name: 'Mango',
      description: 'Delicious in smoothies, but don\'t eat the skin.',
      type: 'other',
      color: 'orange'
    },
    {
      id: 2,
      name: 'Lime',
      description: 'A sour, green fruit used in many drinks.',
      type: 'citrus',
      color: 'green'
    },
    {
      id: 3,
      name: 'Strawberry',
      description: 'A red fruit that goes well with shortcake.',
      type: 'berry',
      color: 'red'
    },
    {
      id: 4,
      name: 'Blueberry',
      description: 'A small, blue fruit often found in muffins.',
      type: 'berry',
      color: 'blue'
    }
  ]);

  constructor(private modalService: SkyModalService) {}

  public openFilterModal() {
    let instance = this.modalService.open(SkyListFiltersModalDemoComponent, [
      {
        provide: SkyListFiltersModalDemoContext,
          useValue: {
            appliedFilters: this.modalFilters
          }
      }
    ]);

    instance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') {
        this.listFilters = result.data.slice();
      }
    });
  }
}
