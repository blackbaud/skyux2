import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

let skyActionButtonUniqueIdentifier = 0;

@Component({
  selector: 'sky-action-button',
  styleUrls: ['./action-button.component.scss'],
  templateUrl: './action-button.component.html'
})
export class SkyActionButtonComponent {
  public componentId = `sky-action-button-${skyActionButtonUniqueIdentifier++}`;

  @Output()
  public actionClick = new EventEmitter<any>();

  public buttonClicked() {
    this.actionClick.emit();
  }
}
