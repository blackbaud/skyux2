
import { SkyModalDemoContext } from '../modal/modal-demo-context';
import { SkyModalDemoFormComponent } from '../modal/modal-demo-form.component';
import { SkyModalDemoTiledFormComponent } from '../modal/modal-demo-tiled-form.component';
import {
  SkyModalService
} from '../../core';
import { Component } from '@angular/core';

import { SkyFlyoutService } from '../../modules/flyout/flyout.service';
import { SkyFlyoutDemoInternalComponent } from './flyout-demo-internal.component';
import { SkyFlyoutDemoInternal2Component } from './flyout-demo-internal-2.component';

@Component({
  selector: 'sky-flyout-demo',
  templateUrl: './flyout-demo.component.html'
})
export class SkyFlyoutDemoComponent {
  public open: boolean;

  constructor(private skyFlyoutService: SkyFlyoutService, private modal: SkyModalService) { }

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

    this.modal.open(modalInstanceType, options);
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
