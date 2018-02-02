
import {
  Injectable
} from '@angular/core';

import { SkyFlyoutAdapterService } from './flyout-adapter.service';
import { SkyFlyoutComponent } from './flyout.component';
import { SkyFlyoutInstance } from './flyout-instance';

import {
  SkyFlyoutConfig
} from './types';

@Injectable()
export class SkyFlyoutService {
  private host: SkyFlyoutComponent;

  constructor(
    private adapter: SkyFlyoutAdapterService
  ) { }

  public create(component: any, config?: SkyFlyoutConfig): SkyFlyoutInstance {
    if (!this.host) {
      this.host = this.adapter.createHostComponent();
    }

    return this.host.attach(component, config);
  }
}
