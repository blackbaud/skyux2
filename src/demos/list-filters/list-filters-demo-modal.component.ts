import { Component } from '@angular/core';

import {
  SkyModalInstance,
  ListFilterModel,
  ListItemModel
} from '@blackbaud/skyux/dist/core';

import { SkyListFiltersModalDemoContext } from './list-filters-demo-modal-context';

@Component({
  selector: 'sky-demo-filter-modal-form',
  templateUrl: './list-filters-demo-modal.component.html'
})
export class SkyListFiltersModalDemoComponent {

  public fruitType: string = 'any';

  public hideOrange: boolean;

  public headerText: string = 'Filters';

  constructor(public context: SkyListFiltersModalDemoContext, public instance: SkyModalInstance) {
    if (this.context && this.context.appliedFilters && this.context.appliedFilters.length > 0) {
      this.setFormFilters(this.context.appliedFilters);
    } else {
      this.clearAllFilters();
    }
  }

  public applyFilters() {
    let result = this.getAppliedFiltersArray();
    this.instance.save(result);
  }

  public clearAllFilters() {
    this.hideOrange = false;
    this.fruitType = 'any';
  }

  public cancel() {
    this.instance.cancel();
  }

  private fruitTypeFilterFunction(item: ListItemModel, filterValue: any): boolean {
    return filterValue === item.data.type;
  }

  private hideOrangeFilterFunction(item: ListItemModel, filterValue: any): boolean {
    return !filterValue || (filterValue && item.data.color !== 'orange');
  }

  private getAppliedFiltersArray() {
    let appliedFilters: Array<ListFilterModel> = [];
    if (this.fruitType !== 'any') {

      appliedFilters.push(new ListFilterModel({
        name: 'fruitType',
        value: this.fruitType,
        label: this.fruitType,
        filterFunction: this.fruitTypeFilterFunction
      }));
    }

    if (this.hideOrange) {
      appliedFilters.push(new ListFilterModel({
        name: 'hideOrange',
        value: true,
        label: 'hide orange fruits',
        filterFunction: this.hideOrangeFilterFunction
      }));
    }

    return appliedFilters;
  }

  private setFormFilters(appliedFilters: Array<any>) {
    for (let i = 0; i < appliedFilters.length; i++) {
      if (appliedFilters[i].name === 'fruitType') {
        this.fruitType = appliedFilters[i].value;
      }

      if (appliedFilters[i].name === 'hideOrange') {
        this.hideOrange = appliedFilters[i].value;
      }
    }
  }
}
