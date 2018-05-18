import { Component } from '@angular/core';

import {
  SkyConfirmButtonAction,
  SkyConfirmInstance,
  SkyConfirmService,
  SkyConfirmType
} from '../../core';

@Component({
  selector: 'sky-confirm-demo',
  templateUrl: './confirm-demo.component.html'
})
export class SkyConfirmDemoComponent {
  public selectedAction: SkyConfirmButtonAction;

  constructor(
    private confirmService: SkyConfirmService
  ) { }

  public openOKConfirm(): void {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.OK
    });

    dialog.closed.subscribe((result: any) => {
      this.selectedAction = result.action;
    });
  }

  public openYesCancelConfirm(): void {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.YesCancel
    });

    dialog.closed.subscribe((result: any) => {
      this.selectedAction = result.action;
    });
  }

  public openYesNoCancelConfirm(): void {
    const dialog: SkyConfirmInstance = this.confirmService.open({
      message: 'Do you wish to continue?',
      type: SkyConfirmType.YesNoCancel
    });

    dialog.closed.subscribe((result: any) => {
      this.selectedAction = result.action;
    });
  }

  public openCustomConfirm(): void {
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
