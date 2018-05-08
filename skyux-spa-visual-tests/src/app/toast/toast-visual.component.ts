import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SkyToastService
} from '@blackbaud/skyux/dist/core';

import {
  ToastDemoComponent
} from './toast-demo.component';

@Component({
  selector: 'toast-visual',
  templateUrl: './toast-visual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastVisualComponent {
  constructor(
    private toastService: SkyToastService
  ) { }

  public openToast() {
    this.toastService.openMessage('Toast message');
  }

  public openTemplatedToast() {
    this.toastService.openTemplatedMessage(ToastDemoComponent, {});
  }
}
