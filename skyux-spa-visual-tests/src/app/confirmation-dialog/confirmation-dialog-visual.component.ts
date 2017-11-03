import { Component } from '@angular/core';

import { SkyConfirmationDialogService,
  SkyConfirmationDialogType } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'confirmation-dialog-visual',
  templateUrl: './confirmation-dialog-visual.component.html'
})
export class ConfirmationDialogVisualComponent {
  constructor(private confirm: SkyConfirmationDialogService) { }

  public openOneBtnDialog() {
    const config: any = {
      description: 'Description of text',
      type: SkyConfirmationDialogType.OKDialog,
      buttons: [ { text: 'Accept' } ]
    };

    this.confirm.open(config);
  }

  public openTwoBtnDialog() {
    const config: any = {
      description: 'Description of text',
      type: SkyConfirmationDialogType.YesCancelDialog,
      buttonText: [ { text: 'Accept' }, { text: 'Cancel' } ]
    };

    this.confirm.open(config);
  }

  public openThreeBtnDialog() {
    const config: any = {
      description: 'Description of text',
      type: SkyConfirmationDialogType.YesNoCancelDialog,
      buttonText: [ { text: 'Accept' }, { text: 'Deny' }, { text: 'Cancel' } ]
    };

    this.confirm.open(config);
  }

  public openLongDescriptionDialog() {
    const config: any = {
      description: 'This is really long text so that it goes to the next line. This is really long'
       + 'text so that it goes to the next line. This is really long text so that it goes to the'
       + 'next line.'
    };

    this.confirm.open(config);
  }
}
