import {
  animate,
  Component,
  EventEmitter,
  Input,
  Output,
  style,
  transition,
  trigger
} from '@angular/core';

@Component({
  selector: 'sky-tab-button',
  template: require('./tab-button.component.html'),
  styles: [require('./tab-shared.scss'), require('./tab-button.component.scss')],
  animations: [
    trigger('tabClose', [
      transition('* => void', [
        animate(150, style({transform: 'scale(0)'}))
      ])
    ])
  ]
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

  public tabState = 'in';

  public doCloseClick() {
    this.tabState = 'out';
    this.closeClick.emit(undefined);
  }
}
