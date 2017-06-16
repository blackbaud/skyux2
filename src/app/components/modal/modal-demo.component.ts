import { Component } from '@angular/core';

import { SkyModalService, SkyModalCloseArgs } from '../../../core';

import { SkyModalDemoContext } from './modal-demo-context';
import { SkyModalDemoFormComponent } from './modal-demo-form.component';

@Component({
  selector: 'sky-modal-demo',
  templateUrl: './modal-demo.component.html'
})
export class SkyModalDemoComponent {
  constructor(private modal: SkyModalService) { }

  public openModal(type: string) {
    let context = new SkyModalDemoContext();
    context.valueA = 'Hello';

    let options: any = {
      providers: [{ provide: SkyModalDemoContext, useValue: context }]
    };

    if (type === 'fullScreenModal') {
      options.fullPage = true;
    } else if (type === 'smallModal') {
      options.size = 'small';
    } else if (type === 'largeModal') {
      options.size = 'large';
    }

    let modalInstance = this.modal.open(SkyModalDemoFormComponent, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      console.log('Modal closed with reason: ' + result.reason + ' and data: ' + result.data);
    });
  }
}
