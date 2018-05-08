import {
  Component
} from '@angular/core';

import {
  SkyToastService
} from '../../core';

import {
  SkyToastCustomDemoComponent
} from './toast-custom-demo.component';

@Component({
  selector: 'sky-toast-demo',
  templateUrl: './toast-demo.component.html'
})
export class SkyToastDemoComponent {
  public selectedType: 'info' | 'success' | 'warning' | 'danger' = 'info';
  public types = ['info', 'success', 'warning', 'danger'];

  constructor(
    private toastSvc: SkyToastService
  ) {}

  public openMessage() {
    this.toastSvc.openMessage('This is a ' + this.selectedType + ' toast.', {toastType: this.selectedType});
  }

  public openTemplatedMessage() {
    this.toastSvc.openTemplatedMessage(SkyToastCustomDemoComponent, {toastType: this.selectedType});
  }
}
