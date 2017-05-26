import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector
} from '@angular/core';

import { SkyModalInstance } from './modal-instance';
import { SkyModalHostComponent } from './modal-host.component';
import { SkyModalAdapterService } from './modal-adapter.service';
import { SkyModalConfiguationInterface as IConfig } from './modal.interface';

@Injectable()
export class SkyModalService {
  private static hostComponent: SkyModalHostComponent;
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private adapter: SkyModalAdapterService
  ) {
    this.createHostComponent();
  }

  // Open Overloads
  public open(component: any, providers?: any[]): SkyModalInstance;
  public open(component: any, config?: IConfig): SkyModalInstance;

  // Open Method
  public open(): SkyModalInstance {
    let modalInstance = new SkyModalInstance();
    this.createHostComponent();
    let providersOrConfig: IConfig = arguments[1];
    let params = this.getConfigFromParameter(providersOrConfig);
    let component = arguments[0];

    params.providers.push({
      provide: SkyModalInstance,
      useValue: modalInstance
    });

    SkyModalService.hostComponent.open(modalInstance, component, params);

    return modalInstance;
  }

  public dispose() {
    /* istanbul ignore else */
    /* sanity check */
    if (SkyModalService.hostComponent) {
      SkyModalService.hostComponent = undefined;
      this.adapter.removeHostEl();
    }
  }

  private getConfigFromParameter(providersOrConfig: any) {
    let defaultParams: IConfig = { 'providers': [], 'fullPage': false };
    let params: any = undefined;
    let method: any = undefined;

    // Object Literal Lookup for backwards compatability.
    method = {
      'providers?': Object.assign({}, defaultParams, { 'providers': providersOrConfig }),
      'config': Object.assign({}, defaultParams, providersOrConfig)
    };

    if (Array.isArray(providersOrConfig) === true) {
      params = method['providers?'];
    } else {
      params = method['config'];
    }

    return params;
  }

  private createHostComponent() {
    if (!SkyModalService.hostComponent) {
      let factory = this.resolver.resolveComponentFactory(SkyModalHostComponent);

      this.adapter.addHostEl();

      let cmpRef = this.appRef.bootstrap(factory);

      SkyModalService.hostComponent = cmpRef.instance;
    }
  }
}
