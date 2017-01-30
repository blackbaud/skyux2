import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './button-large.component.fixture.html'
})
export class ButtonLargeTestComponent {

  public buttonIsClicked: boolean = false;

  public buttonClicked() {
    this.buttonIsClicked = true;
  }
}
