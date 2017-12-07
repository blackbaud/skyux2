import { Component } from '@angular/core';

import {
  SkyConfirmService,
  SkyConfirmType,
  SkyConfirmInstance
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'confirm-visual',
  templateUrl: './confirm-visual.component.html'
})
export class ConfirmVisualComponent {
  constructor(
    private confirmService: SkyConfirmService
  ) { }

  public openOKConfirm() {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.OK
    });
  }

  public openYesCancelConfirm() {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.YesCancel
    });
  }

  public openYesNoCancelConfirm() {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.YesNoCancel
    });
  }

  public openCustomConfirm() {
    this.confirmService.open({
      message: [
        'This is really long text so that it goes to the next line. This is really long',
        'text so that it goes to the next line. This is really long text so that it goes to the',
        'next line.'
      ].join(' '),
      type: SkyConfirmType.Custom,
      buttons: [
        { text: '1', action: 'foo', styleType: 'primary' },
        { text: '2', action: 'bar', autofocus: true },
        { text: '3', action: 'baz' }
      ]
    });
  }
}
