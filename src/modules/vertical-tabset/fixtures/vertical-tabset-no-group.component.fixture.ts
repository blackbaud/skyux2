import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './vertical-tabset-no-group.component.fixture.html'
})
export class VerticalTabsetNoGroupTestComponent {
  public currrentIndex: number = undefined;

  public indexChanged(index: number) {
    this.currrentIndex = index;
  }
}
