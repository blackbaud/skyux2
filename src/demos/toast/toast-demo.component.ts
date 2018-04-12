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
      this.toastSvc.openMessage("This is an info toast.");
  }

  public openTemplatedMessage() {
    this.toastSvc.openTemplatedMessage(SkyToastCustomDemoComponent);
  }
}
