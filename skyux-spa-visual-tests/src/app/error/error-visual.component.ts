import { Component } from '@angular/core';

import {
  SkyErrorModalService
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'error-visual',
  templateUrl: './error-visual.component.html'
})
export class ErrorVisualComponent {
  constructor(private modal: SkyErrorModalService) { }

  public openModal() {
    const config: any = {
      errorTitle: 'Some error title',
      errorDescription: 'Description of error',
      errorCloseText: 'Close button text'
    };

    this.modal.open(config);
  }

  public openModalWithLongDescription() {
    const config: any = {
      errorTitle: 'Title',
      // tslint:disable-next-line:max-line-length
      errorDescription: 'Try to refresh this page, or come back later. And now I\'m going to make this really long so that it will go to the next line.',
      errorCloseText: 'Close'
    };

    this.modal.open(config);
  }
}
