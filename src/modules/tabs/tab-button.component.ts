import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'sky-tab-button',
  templateUrl: './tab-button.component.html',
  styleUrls: ['./tab-button.component.scss']
})
export class SkyTabButtonComponent {
  @Input()
  public tabHeading: string;

  @Input()
  public active: boolean;

  @Input()
  public allowClose: boolean;

  @Output()
  public tabClick = new EventEmitter<any>();

  @Output()
  public closeClick = new EventEmitter<any>();

  public doCloseClick() {
    this.closeClick.emit(undefined);
  }
}
