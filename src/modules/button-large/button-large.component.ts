import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'sky-button-large',
  styleUrls: ['./button-large.component.scss'],
  templateUrl: './button-large.component.html'
})
export class SkyButtonLargeComponent {
  @Output()
  buttonClick = new EventEmitter<any>();

  public buttonClicked() {
    this.buttonClick.emit();
  }
}
