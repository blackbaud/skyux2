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
}
