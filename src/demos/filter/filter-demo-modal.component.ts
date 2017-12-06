import { Component } from '@angular/core';

import { SkyModalInstance } from '@blackbaud/skyux/dist/core';

import { SkyFilterDemoModalContext } from './filter-demo-modal-context';

@Component({
  selector: 'sky-demo-filter-modal-form',
  templateUrl: './filter-demo-modal.component.html'
})
export class SkyFilterDemoModalComponent {
  public fruitType = 'any';
  public hideOrange: boolean;

  constructor(
    public context: SkyFilterDemoModalContext,
    public instance: SkyModalInstance
  ) {
    if (
      this.context &&
      this.context.appliedFilters &&
      this.context.appliedFilters.length > 0
    ) {
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

  private getAppliedFiltersArray() {
    let appliedFilters: any[] = [];
    if (this.fruitType !== 'any') {
      appliedFilters.push({
        name: 'fruitType',
        value: this.fruitType,
        label: this.fruitType
      });
    }

    if (this.hideOrange) {
      appliedFilters.push({
        name: 'hideOrange',
        value: true,
        label: 'hide orange fruits'
      });
    }

    return appliedFilters;
  }

  private setFormFilters(appliedFilters: any[]) {
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
