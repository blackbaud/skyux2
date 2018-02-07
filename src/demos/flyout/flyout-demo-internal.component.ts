import {
  Component
} from '@angular/core';

import { FlyoutDemoContext } from './flyout-demo-context';

@Component({
  selector: 'sky-flyout-demo-internal',
  templateUrl: './flyout-demo-internal.component.html'
})
export class SkyFlyoutDemoInternalComponent {
  constructor(
    public context: FlyoutDemoContext
  ) { }
}
