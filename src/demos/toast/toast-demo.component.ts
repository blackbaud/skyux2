import { Component, Type } from '@angular/core';

import {
  SkyToastService
} from '../../core';
import { SkyToastCustomDemoComponent } from './toast-custom/toast-custom-demo.component';

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
    this.toastSvc.openTemplatedMessage(SkyToastCustomDemoComponent, {disableTimeout: true});
  }
}
