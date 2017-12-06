import { Component } from '@angular/core';

import {
  SkyModalService,
  SkyModalCloseArgs
} from '@blackbaud/skyux/dist/core';

import { SkyFilterDemoModalComponent } from './filter-demo-modal.component';
import { SkyFilterDemoModalContext } from './filter-demo-modal-context';

@Component({
  selector: 'sky-filter-demo',
  templateUrl: './filter-demo.component.html'
})
export class SkyFilterDemoComponent {
  public appliedFilters: any[] = [];
  public items: any[] = [
    {
      name: 'Orange',
      description: 'A round, orange fruit.',
      type: 'citrus',
      color: 'orange'
    },
    {
      name: 'Mango',
      description: 'Delicious in smoothies, but don\'t eat the skin.',
      type: 'other',
      color: 'orange'
    },
    {
      name: 'Lime',
      description: 'A sour, green fruit used in many drinks.',
      type: 'citrus',
      color: 'green'
    },
    {
      name: 'Strawberry',
      description: 'A red fruit that goes well with shortcake.',
      type: 'berry',
      color: 'red'
    },
    {
      name: 'Blueberry',
      description: 'A small, blue fruit often found in muffins.',
      type: 'berry',
      color: 'blue'
    }

  ];

  public filteredItems: any[];

  constructor(private modal: SkyModalService) {
    this.filteredItems = this.items.slice();
  }

  public filterButtonClicked() {
    let modalInstance = this.modal.open(
      SkyFilterDemoModalComponent,
      [{
        provide: SkyFilterDemoModalContext,
        useValue: {
          appliedFilters: this.appliedFilters
        }
      }]
    );

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'save') {
        this.appliedFilters = result.data.slice();
        this.filteredItems = this.filterItems(this.items, this.appliedFilters);
      }
    });
  }

  public onDismiss(index: number) {
    this.appliedFilters.splice(index, 1);
    this.filteredItems = this.filterItems(this.items, this.appliedFilters);
  }

  private orangeFilterFailed(filter: any, item: any) {
    return filter.name === 'hideOrange' && filter.value && item.color === 'orange';
  }

  private fruitTypeFilterFailed(filter: any, item: any) {
    return filter.name === 'fruitType' && filter.value !== 'any' && filter.value !== item.type;
  }

  private itemIsShown(filters: Array<any>, item: Array<any>) {
    let passesFilter = true,
        j: number;

    for (j = 0; j < filters.length; j++) {
      if (this.orangeFilterFailed(filters[j], item)) {
        passesFilter = false;
      } else if (this.fruitTypeFilterFailed(filters[j], item)) {
        passesFilter = false;
      }
    }

    return passesFilter;
  }

  private filterItems(items: Array<any>, filters: Array<any>) {
    let i: number,
      passesFilter: boolean,
      result: Array<any> = [];

    for (i = 0; i < items.length; i++) {
      passesFilter = this.itemIsShown(filters, items[i]);
      if (passesFilter) {
        result.push(items[i]);
      }
    }

    return result;
  }
}
