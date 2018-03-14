import { Component } from '@angular/core';

import { SkyFlyoutService } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-test-cmp-flyout',
  templateUrl: './flyout-demo.component.html',
  providers: [SkyFlyoutService]
})
export class FlyoutDemoComponent {
}
