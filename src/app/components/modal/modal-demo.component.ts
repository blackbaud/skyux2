import { Component } from '@angular/core';

import { SkyModalService, SkyModalCloseArgs } from '../../../core';

import { SkyModalDemoContext } from './modal-demo-context';
import { SkyModalDemoFormComponent } from './modal-demo-form.component';
import { SkyModalDemoTiledFormComponent } from './modal-demo-tiled-form.component';

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

    let modalInstanceType = SkyModalDemoFormComponent;
    if (type === 'fullScreenModal') {
      options.fullPage = true;
    } else if (type === 'smallModal') {
      options.size = 'small';
    } else if (type === 'largeModal') {
      options.size = 'large';
    } else if (type === 'tiledModal')  {
      modalInstanceType = SkyModalDemoTiledFormComponent;
    }

    options.ariaDescribedBy = 'docs-modal-content';

    let modalInstance = this.modal.open(modalInstanceType, options);

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      console.log('Modal closed with reason: ' + result.reason + ' and data: ' + result.data);
    });
  }
}
