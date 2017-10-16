import { Component } from '@angular/core';

import {
  SkyConfirmationDialogService
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'confirmation-dialog-visual',
  templateUrl: './confirmation-dialog-visual.component.html'
})
export class ConfirmationDialogVisualComponent {
  constructor(private confirm: SkyConfirmationDialogService) { }

  public openDialog() {
    const config: any = {
      description: 'Description of text',
      confirmText: 'Accept',
      cancelText: 'Deny'
    };

    this.confirm.open(config);
  }

  public openDialogWithLongDescription() {
    const config: any = {
      description: 'This is really long text so that it goes to the next line. This is really long'
       + 'text so that it goes to the next line. This is really long text so that it goes to the'
       + 'next line.'
    };

    this.confirm.open(config);
  }
}
