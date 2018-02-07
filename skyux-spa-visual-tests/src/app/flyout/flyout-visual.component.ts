import { Component } from '@angular/core';
import { SkyFlyoutService } from '@blackbaud/skyux/dist/core';

import { FlyoutDemoComponent } from './flyout-demo.component';

@Component({
  selector: 'flyout-visual',
  templateUrl: './flyout-visual.component.html'
})
export class FlyoutVisualComponent {
  constructor(
    private flyoutService: SkyFlyoutService
  ) { }

  public openFlyout() {
    this.flyoutService.open(FlyoutDemoComponent, {
      providers: []
    });
  }
}
