import { Component } from '@angular/core';

import {
  ErrorModalConfig,
  SkyErrorModalService
} from '../../core';

@Component({
  selector: 'sky-error-demo',
  templateUrl: './error-demo.component.html',
  styleUrls: ['./error-demo.component.scss'],
  providers: [SkyErrorModalService]
})
export class SkyErrorDemoComponent {
  constructor(
    private errorService: SkyErrorModalService
  ) { }

  public customAction(): void {
    alert('action clicked!');
  }

  public openErrorModal(): void {
    const config: ErrorModalConfig = {
      errorTitle: 'Something bad happened!',
      errorDescription: 'Try to refresh this page, or come back later.',
      errorCloseText: 'OK'
    };

    this.errorService.open(config);
  }
}
