
import { Component } from '@angular/core';

import { SkyFlyoutService } from '../../modules/flyout/flyout.service';
import { SkyFlyoutDemoInternalComponent } from './flyout-demo-internal.component';
import { SkyFlyoutInstance } from '../../modules/flyout/flyout-instance';

@Component({
  selector: 'sky-flyout-demo',
  templateUrl: './flyout-demo.component.html'
})
export class SkyFlyoutDemoComponent {

  private flyoutInstance: SkyFlyoutInstance;

  constructor(private skyFlyoutService: SkyFlyoutService) { }

  public openFlyout() {
    this.flyoutInstance = this.skyFlyoutService.open(SkyFlyoutDemoInternalComponent, { providers: [] });
  }

  public closeFlyout() {
    if (this.flyoutInstance) {
      this.flyoutInstance.close();
      this.flyoutInstance = undefined;
    }
  }

  public toggleFlyout() {
    if (this.flyoutInstance) {
      this.closeFlyout();
    } else {
      this.openFlyout();
    }
  }

}
