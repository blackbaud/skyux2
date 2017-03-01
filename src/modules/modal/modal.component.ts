import {
  animate,
  Component,
  state,
  style,
  transition,
  trigger
} from '@angular/core';

import { SkyModalHostService } from './modal-host.service';
import { SkyModalConfiguation } from './modal-configuration';

@Component({
  selector: 'sky-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalState', [
      state('in', style({ opacity: '1.0' })),
      state('out', style({ opacity: '0.0' })),
      transition('void => *', [
        style({ opacity: '0.0' }),
        animate(150)
      ]),
      transition('* => void', [
        animate(150, style({ opacity: '0.0' }))
      ])
    ])
  ]
})
export class SkyModalComponent {
  public modalState = 'in';

  public get modalZIndex() {
    return this.hostService.getModalZIndex();
  }
  public get modalFullPage(){
    return this.config.fullPage;
  }
  constructor(
  private hostService: SkyModalHostService,
  private config: SkyModalConfiguation) { }

  public closeButtonClick() {
    this.hostService.onClose(this);
  }
}
