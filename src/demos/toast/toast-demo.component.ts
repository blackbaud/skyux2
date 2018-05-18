import {
  Component
} from '@angular/core';

import {
  SkyToastService,
  SkyToastType
} from '../../core';

import {
  SkyToastCustomDemoContext
} from './toast-custom-demo-context';

import {
  SkyToastCustomDemoComponent
} from './toast-custom-demo.component';

@Component({
  selector: 'sky-toast-demo',
  templateUrl: './toast-demo.component.html'
})
export class SkyToastDemoComponent {
  public selectedType: SkyToastType = SkyToastType.Info;
  public types: SkyToastType[] = [
    SkyToastType.Info,
    SkyToastType.Success,
    SkyToastType.Warning,
    SkyToastType.Danger
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
    const context = new SkyToastCustomDemoContext(
      'This toast has embedded a custom component for its content.'
    );

    const instance = this.toastService.openComponent(
      SkyToastCustomDemoComponent,
      {
        type: this.selectedType
      },
      [{
        provide: SkyToastCustomDemoContext,
        useValue: context
      }]
    );

    instance.closed.subscribe(() => {
      console.log('Custom component toast closed!');
    });
  }

  public closeAll(): void {
    this.toastService.closeAll();
  }
}
