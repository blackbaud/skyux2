import { Component } from '@angular/core';

import { SkyModalService, SkyModalCloseArgs } from '@blackbaud/skyux/dist/core';

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
    const context = new SkyModalDemoContext();
    context.valueA = 'Hello';

    const options: any = {
      providers: [{ provide: SkyModalDemoContext, useValue: context }],
      ariaDescribedBy: 'docs-modal-content'
    };

    let modalInstanceType = SkyModalDemoFormComponent;

    switch (type) {
      case 'fullScreenModal':
      options.fullPage = true;
      break;
      case 'smallModal':
      options.size = 'small';
      break;
      case 'largeModal':
      options.size = 'large';
      break;
      case 'tiledModal':
      modalInstanceType = SkyModalDemoTiledFormComponent;
      break;
      case 'withHelpHeader':
      options.helpKey = 'demo-key.html';
      break;
      default:
      break;
    }

    const modalInstance = this.modal.open(modalInstanceType, options);

    modalInstance.closed.first().subscribe((result: SkyModalCloseArgs) => {
      console.log(`Modal closed with reason: ${result.reason} and data: ${result.data}`);
    });

    modalInstance.helpOpened.subscribe((helpKey: string) => {
      context.eventMessage =  `
        Modal header help was invoked with the following help key: ${helpKey}
      `;
    });
  }
}
