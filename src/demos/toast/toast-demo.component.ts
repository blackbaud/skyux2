import { Component } from '@angular/core';

import {
  SkyToastService
} from '../../core';

@Component({
  selector: 'sky-toast-demo',
  templateUrl: './toast-demo.component.html'
})
export class SkyToastDemoComponent {
  constructor(private toastSvc: SkyToastService) { }

  public openMessage() {
      this.toastSvc.openMessage("This is a toast that lasts 10 seconds.");
  }

  public openPersistentMessage() {
    this.toastSvc.open({message: 'This toast has no timeout.', disableTimeout: true});
  }

  public openTemplatedMessage() {
    this.toastSvc.openMessage('This toast has no timeout.', {disableTimeout: true});
  }
}
