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
    this.filtersActive = this.fruitType !== 'any' || this.hideOrange;
  }

}
