import { Component } from '@angular/core';

import {
  SkyConfirmService
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'confirm-visual',
  templateUrl: './confirm-visual.component.html'
})
export class ConfirmVisualComponent {
  constructor(
    private confirmService: SkyConfirmService
  ) { }

  public openConfirm(type: number) {
    this.confirmService.open({
      message: 'Do you wish to continue?',
      type
    });
  }

  public openCustomConfirm() {
    this.confirmService.open({
      message: [
        'This is really long text so that it goes to the next line. This is really long',
        'text so that it goes to the next line. This is really long text so that it goes to the',
        'next line.'
      ].join(' '),
      type: 3,
      buttons: [
        { text: '1', action: 'foo' },
        { text: '2', action: 'bar', autofocus: true },
        { text: '3', action: 'baz' },
        { text: 'wontshow' }
      ]
    });
  }
}
