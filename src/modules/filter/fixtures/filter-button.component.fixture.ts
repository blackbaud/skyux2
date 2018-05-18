import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './filter-button.component.fixture.html'
})
export class FilterButtonTestComponent {
  public filtersActive: boolean = false;

  public buttonClicked: boolean = false;
  public filterButtonClicked(): void {
    this.buttonClicked = true;
  }
}
