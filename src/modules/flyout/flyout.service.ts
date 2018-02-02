
import {
  ComponentRef,
  Injectable
} from '@angular/core';

import { SkyFlyoutAdapterService } from './flyout-adapter.service';

import {
  SkyFlyoutConfig,
  SkyFlyoutComponent,
  SkyFlyoutInstance
} from './index';

@Injectable()
export class SkyFlyoutService {
  private static hostComponentRef: ComponentRef<SkyFlyoutComponent>;
  private currentActiveEl: HTMLElement;

  constructor(
    private adapter: SkyFlyoutAdapterService
  ) { }

  public open(component: any, config?: SkyFlyoutConfig): SkyFlyoutInstance {
    this.currentActiveEl = this.adapter.getCurrentActiveElement();
    this.createHostComponent();
    const flyoutInstance = SkyFlyoutService.hostComponentRef.instance.open(component, config);
    return flyoutInstance;
  }

  public close() {
    /* istanbul ignore else */
    /* sanity check */
    if (SkyFlyoutService.hostComponentRef) {
      SkyFlyoutService.hostComponentRef.instance.close();
    }
  }

  private createHostComponent() {
    if (!SkyFlyoutService.hostComponentRef) {
      SkyFlyoutService.hostComponentRef = this.adapter.appendHostEl();
      SkyFlyoutService.hostComponentRef.instance.closed.subscribe(() => this.removeHostComponent());
    }
  }

  private removeHostComponent() {
    /* istanbul ignore else */
    /* sanity check */
    if (SkyFlyoutService.hostComponentRef) {
      this.adapter.removeHostEl(SkyFlyoutService.hostComponentRef);
      SkyFlyoutService.hostComponentRef = undefined;

      /* istanbul ignore else */
      /* sanity check */
      if (this.currentActiveEl && this.currentActiveEl.focus) {
        this.currentActiveEl.focus();
      }
    }
  }
}
