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
      this.toastSvc.openMessage("Bananas aren't shoes");
  }
}
