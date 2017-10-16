import { Component } from '@angular/core';

import { SkyConfirmationDialogService } from
  '../../../modules/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'sky-confirmation-dialog-demo',
  templateUrl: './confirmation-dialog-demo.component.html'
})
export class SkyConfirmationDialogDemoComponent {
  public action: string;

  constructor(private confirmService: SkyConfirmationDialogService) {}

  public openConfirmationDialog() {
    const config: any = {
      description: 'Are you really sure you want to do this?'
    };

    this.confirmService.open(config).closed.subscribe((result: any) => {
      if (result.data === 'confirm') {
        this.action = 'You accepted the dialog.';
      } else if (result.data === 'cancel') {
        this.action = 'You cancelled the dialog.';
      }
    });
  }
}
