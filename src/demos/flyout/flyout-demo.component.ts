
import { SkyModalDemoContext } from '../modal/modal-demo-context';
import { SkyModalDemoFormComponent } from '../modal/modal-demo-form.component';
import { SkyModalDemoTiledFormComponent } from '../modal/modal-demo-tiled-form.component';
import {
  SkyModalService,
  SkyModalCloseArgs
} from '../../core';
import { SkyFlyoutComponent } from './../../modules/flyout/flyout.component';
import { Component, ViewChild } from '@angular/core';

import { SkyFlyoutService } from '../../modules/flyout/flyout.service';
import { SkyFlyoutDemoInternalComponent } from './flyout-demo-internal.component';
import { SkyFlyoutDemoInternal2Component } from './flyout-demo-internal-2.component';

@Component({
  selector: 'sky-flyout-demo',
  templateUrl: './flyout-demo.component.html'
})
export class SkyFlyoutDemoComponent {
  @ViewChild(SkyFlyoutComponent) public flyout: SkyFlyoutComponent;
  public open: boolean;

  constructor(private modal: SkyModalService, public skyFlyoutService: SkyFlyoutService) { }

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

    modalInstance.closed.take(1).subscribe((result: SkyModalCloseArgs) => {
      console.log(`Modal closed with reason: ${result.reason} and data: ${result.data}`);
    });

    modalInstance.helpOpened.subscribe((helpKey: string) => {
      context.eventMessage =  `
        Modal header help was invoked with the following help key: ${helpKey}
      `;
    });
  }

  public toggleState() {
    if (!this.open) {
      this.skyFlyoutService.open(SkyFlyoutDemoInternalComponent, []);
    } else {
      this.skyFlyoutService.open(SkyFlyoutDemoInternal2Component, []);
    }

    this.open = true;
  }

}
