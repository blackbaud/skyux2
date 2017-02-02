import { Component } from '@angular/core';

@Component({
  selector: 'sky-test-cmp',
  templateUrl: './action-button.component.fixture.html'
})
export class ActionButtonTestComponent {

  public buttonIsClicked: boolean = false;

  public buttonClicked() {
    this.buttonIsClicked = true;
  }
}
