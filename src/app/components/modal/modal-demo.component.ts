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

    let windowMode = {

      'defaultModal': [{ provide: SkyModalDemoContext, useValue: context }],

      'fullScreenModal': {
        'fullPage': true,
        'providers': [{ provide: SkyModalDemoContext, useValue: context }]
      }
    };
    let modalInstance = this.modal.open(SkyModalDemoFormComponent, windowMode[type]);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      console.log('Modal closed with reason: ' + result.reason + ' and data: ' + result.data);
    });
  }
}
