import {
  animate,
  Component,
  OnInit,
  state,
  style,
  transition,
  trigger
} from '@angular/core';

import { SkyModalHostService } from './modal-host.service';

@Component({
  selector: 'sky-modal',
  template: require('./modal.component.html'),
  styles: [require('./modal.component.scss')],
  animations: [
    trigger('modalState', [
      state('in', style({opacity: '1.0'})),
      state('out', style({opacity: '0.0'})),
      transition('void => *', [
        style({opacity: '0.0'}),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({opacity: '0.0'}))
      ])
    ])
  ]
})
export class SkyModalComponent implements OnInit {
  public modalState = 'in';

  public get modalZIndex() {
    return this.hostService.getModalZIndex();
  }

  constructor(private hostService: SkyModalHostService) { }

  public closeButtonClick() {
    this.hostService.onClose(this);
  }

  public ngOnInit() {
    console.log('on init');
  }
}
