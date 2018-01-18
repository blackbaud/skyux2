
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

@Component({
  selector: 'sky-flyout-demo',
  templateUrl: './flyout-demo.component.html'
})
export class SkyFlyoutDemoComponent {

  constructor(private skyFlyoutService: SkyFlyoutService, private modal: SkyModalService) { }

  public toggleState() {
    this.skyFlyoutService.open(SkyFlyoutComponent, []);
  }

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
  }

}
