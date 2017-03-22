import { Component } from '@angular/core';

@Component({
  selector: 'sky-filter-demo',
  templateUrl: './filter-demo.component.html'
})
export class SkyFilterDemoComponent {
  public filtersActive: boolean = false;

  public filterButtonClicked() {
    this.filtersActive = !this.filtersActive;
  }
}
