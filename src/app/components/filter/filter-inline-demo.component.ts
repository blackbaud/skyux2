import { Component } from '@angular/core';

@Component({
  selector: 'sky-inline-filter-demo',
  templateUrl: './filter-inline-demo.component.html'
})
export class SkyFilterInlineDemoComponent {

  public filtersActive: boolean = false;

  public showInlineFilters: boolean = false;

  public fruitType: string = 'any';

  public hideOrange: boolean = false;

  public items: Array<any> = [
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

  public filteredItems: Array<any>;

  public appliedFilters: Array<any> = [];

  constructor() {
    this.filteredItems = this.items.slice();
  }

  public filterButtonClicked() {
    this.showInlineFilters = !this.showInlineFilters;
  }

  public fruitTypeChange(newValue: string) {
    this.fruitType = newValue;
    this.setFilterActiveState();
  }

  public hideOrangeChange(newValue: boolean) {
    this.hideOrange = newValue;
    this.setFilterActiveState();
  }

  private setFilterActiveState() {
    this.appliedFilters = [];
    if (this.fruitType !== 'any') {
      this.appliedFilters.push({
        name: 'fruitType',
        value: this.fruitType
      });
    }
    if (this.hideOrange) {
      this.appliedFilters.push({
        name: 'hideOrange',
        value: true
      });
    }
    this.filtersActive = this.appliedFilters.length > 0;

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
