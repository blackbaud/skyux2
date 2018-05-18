import { Component} from '@angular/core';

@Component({
  selector: 'action-button-visual',
  templateUrl: './action-button-visual.component.html'
})
export class ActionButtonVisualComponent {

  public buttonIsClicked: boolean = false;

  public buttonClicked(): void {
    this.buttonIsClicked = true;
  }
}
