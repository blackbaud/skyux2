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

  public openOKConfirm() {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.OK
    });

    dialog.closed.subscribe((result: any) => {
      this.selectedAction = result.action;
    });
  }

  public openYesCancelConfirm() {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.YesCancel
    });

    dialog.closed.subscribe((result: any) => {
      this.selectedAction = result.action;
    });
  }

  public openYesNoCancelConfirm() {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.YesNoCancel
    });

    dialog.closed.subscribe((result: any) => {
      this.selectedAction = result.action;
    });
  }

  public openCustomConfirm() {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'What option are you going to select?',
      type: SkyConfirmType.Custom,
      buttons: [
        { text: '1', action: 'foo', styleType: 'primary' },
        { text: '2', action: 'bar' },
        { text: '3', action: 'baz', autofocus: true }
      ]
    });

    dialog.closed.subscribe((result: any) => {
      this.selectedAction = result.action;
    });
  }
}
