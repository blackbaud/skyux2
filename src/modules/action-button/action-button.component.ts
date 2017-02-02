import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'sky-action-button',
  styleUrls: ['./action-button.component.scss'],
  templateUrl: './action-button.component.html'
})
export class SkyActionButtonComponent {
  @Output()
  public actionClick = new EventEmitter<any>();

  public buttonClicked() {
    this.actionClick.emit();
  }

  public enterPress(event: KeyboardEvent) {
    if (event.which === 13) {
      this.actionClick.emit();
    }
  }
}
