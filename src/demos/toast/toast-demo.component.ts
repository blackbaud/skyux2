import {
  Component
} from '@angular/core';

import {
  SkyToastService,
  SkyToastType
} from '../../core';

import {
  SkyToastCustomDemoComponent
} from './toast-custom-demo.component';

@Component({
  selector: 'sky-toast-demo',
  templateUrl: './toast-demo.component.html'
})
export class SkyToastDemoComponent {
  public selectedType: SkyToastType = 'info';
  public types: SkyToastType[] = [
    'info',
    'success',
    'warning',
    'danger'
  ];

  constructor(
    private toastService: SkyToastService
  ) { }

  public openMessage(): void {
    const instance = this.toastService.openMessage(
      `This is a ${this.selectedType} toast.`,
      {
        type: this.selectedType
      }
    );

    instance.closed.subscribe(() => {
      console.log('Message toast closed!');
    });
  }

  public openComponent(): void {
    const instance = this.toastService.openComponent(
      SkyToastCustomDemoComponent,
      {
        type: this.selectedType
      }
    );

    instance.closed.subscribe(() => {
      console.log('Custom component toast closed!');
    });
  }

  public closeAll(): void {
    this.toastService.closeAll();
  }
}
