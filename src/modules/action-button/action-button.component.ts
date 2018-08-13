import {
  Component,
  EventEmitter,
  Output,
  Input
} from '@angular/core';

@Component({
  selector: 'sky-action-button',
  styleUrls: ['./action-button.component.scss'],
  templateUrl: './action-button.component.html'
})
export class SkyActionButtonComponent {
  @Input()
  public url: string;
  @Output()
  public actionClick = new EventEmitter<any>();

  public buttonClicked() {
    this.actionClick.emit();
  }

  public enterPress() {
    this.actionClick.emit();
  }
}
