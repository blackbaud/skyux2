
import { Component } from '@angular/core';

import { SkyFlyoutService } from '../../modules/flyout/flyout.service';
import { SkyFlyoutDemoInternalComponent } from './flyout-demo-internal.component';

@Component({
  selector: 'sky-flyout-demo',
  templateUrl: './flyout-demo.component.html'
})
export class SkyFlyoutDemoComponent {

  constructor(private skyFlyoutService: SkyFlyoutService) { }

  public openFlyout() {
    this.skyFlyoutService.open(SkyFlyoutDemoInternalComponent, { providers: [] });
  }

}
