import { Component } from '@angular/core';

import {
  SkyConfirmService,
  SkyConfirmType
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'confirm-visual',
  templateUrl: './confirm-visual.component.html'
})
export class ConfirmVisualComponent {
  constructor(
    private confirmService: SkyConfirmService
  ) { }

  public openOKConfirm(): void {
    this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.OK
    });
  }

  public openYesCancelConfirm(): void {
    this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.YesCancel
    });
  }

  public openYesNoCancelConfirm(): void {
    this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.YesNoCancel
    });
  }

  public openCustomConfirm(): void {
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
