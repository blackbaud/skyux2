
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable
} from '@angular/core';

import { SkyFlyoutInstance } from './flyout-instance';
import { SkyFlyoutAdapterService } from './flyout-adapter.service';
import { SkyFlyoutConfigurationInterface as IConfig } from './flyout.interface';

@Injectable()
export class SkyFlyoutService {

  private flyoutExists: boolean;

  constructor(
    private adapter: SkyFlyoutAdapterService
  ) {}

  // Open Overloads
  public open(component: any, providers?: any[]): SkyFlyoutInstance;
  public open(component: any, config?: IConfig): SkyFlyoutInstance;

  // Open Method
  public open(): SkyFlyoutInstance {
    let flyoutInstance = new SkyFlyoutInstance();
    let providersOrConfig: IConfig = arguments[1];
    let resolvedConfig = this.getConfigFromParameter(providersOrConfig);
    let component = arguments[0];

    resolvedConfig.providers.push({
      provide: SkyFlyoutInstance,
      useValue: flyoutInstance
    });

    this.adapter.addFlyout(flyoutInstance, component, resolvedConfig);

    this.flyoutExists = true;

    return flyoutInstance;
  }

  public dispose() {
    /* istanbul ignore else */
    /* sanity check */
    if (this.flyoutExists) {
      this.adapter.removeFlyout();
      this.flyoutExists = false;
    }
  }

  private getConfigFromParameter(providersOrConfig: any) {
    let config: IConfig;

    if (Array.isArray(providersOrConfig) === true) {
      config = Object.assign({'providers': []}, { 'providers': providersOrConfig });
    } else {
      config = Object.assign({'providers': []}, providersOrConfig);
    }

    return config;
  }
}
