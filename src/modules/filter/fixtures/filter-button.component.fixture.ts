import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './filter-button.component.fixture.html'
})
export class FilterButtonTestComponent {
  public filtersActive = false;

  public buttonClicked = false;
  public filterButtonClicked() {
    this.buttonClicked = true;
  }
}
