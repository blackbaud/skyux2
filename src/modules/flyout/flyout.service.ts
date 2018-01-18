
import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable
} from '@angular/core';

import { SkyFlyoutInstance } from './flyout-instance';
import { SkyFlyoutAdapterService } from './flyout-adapter.service';
import { SkyFlyoutConfigurationInterface as IConfig } from './flyout.interface';
import { SkyFlyoutComponent } from './flyout.component';

@Injectable()
export class SkyFlyoutService {
  private static hostComponent: SkyFlyoutComponent;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private adapter: SkyFlyoutAdapterService
  ) { }

  // Open Overloads
  public open(component: any, providers?: any[]): SkyFlyoutInstance;
  public open(component: any, config?: IConfig): SkyFlyoutInstance;

  // Open Method
  public open(): SkyFlyoutInstance {
    let flyoutInstance = new SkyFlyoutInstance();
    this.createHostComponent();
    let providersOrConfig: IConfig = arguments[1];
    let resolvedConfig = this.getConfigFromParameter(providersOrConfig);
    let component = arguments[0];

    resolvedConfig.providers.push({
      provide: SkyFlyoutInstance,
      useValue: flyoutInstance
    });

    SkyFlyoutService.hostComponent.open(flyoutInstance, component, resolvedConfig);

    return flyoutInstance;
  }

  public close() {
    /* istanbul ignore else */
    /* sanity check */
    if (SkyFlyoutService.hostComponent) {
      SkyFlyoutService.hostComponent = undefined;
      this.adapter.removeHostEl();
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

  private createHostComponent() {
    if (!SkyFlyoutService.hostComponent) {
      let factory = this.resolver.resolveComponentFactory(SkyFlyoutComponent);

      this.adapter.addHostEl();

      let cmpRef = this.appRef.bootstrap(factory);

      SkyFlyoutService.hostComponent = cmpRef.instance;
    }
  }
}
