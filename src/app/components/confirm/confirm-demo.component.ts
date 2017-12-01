import { Component } from '@angular/core';

import {
  SkyConfirmButtonAction,
  SkyConfirmInstance,
  SkyConfirmService,
  SkyConfirmType
} from '../../../modules/confirm';

@Component({
  selector: 'sky-confirm-demo',
  templateUrl: './confirm-demo.component.html'
})
export class SkyConfirmDemoComponent {
  public selectedAction: SkyConfirmButtonAction;

  constructor(
    private confirmService: SkyConfirmService
  ) { }

  public openConfirm(type: SkyConfirmType) {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you wish to continue?',
      type
    });

    dialog.closed.subscribe((result: any) => {
      this.selectedAction = result.action;
    });
  }

  public openCustomConfirm() {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'What option are you going to select?',
      type: SkyConfirmType.YesNoCancel,
      buttons: [
        { text: '1', action: 'foo' },
        { text: '2', action: 'bar' },
        { text: '3', action: 'baz', autofocus: true },
        { text: 'wontshow' }
      ]
    });

    dialog.closed.subscribe((result: any) => {
      this.selectedAction = result.action;
    });
  }
}
