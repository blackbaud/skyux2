import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector
} from '@angular/core';

import { SkyModalInstance } from './modal-instance';
import { SkyModalHostComponent } from './modal-host.component';
import { SkyModalAdapterService } from './modal-adapter.service';
import { SkyModalConfiguationInterface as IConfig }  from './modal.interface';
import { SkyModalConfiguation } from './modal-configuration';

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
  public open(component: any, config?: IConfig): SkyModalInstance

  // Open Method
  public open(): SkyModalInstance {
    let modalInstance = new SkyModalInstance();
    this.createHostComponent();
    let defaultParams: IConfig = { 'providers': [], 'fullPage': false };
    let component = arguments[0];
    let providersOrConfig: IConfig = arguments[1];

    // Object Literal Lookup for backwards compatability.
    let method = {
      'providers?': Object.assign(defaultParams, { 'providers': providersOrConfig }),
      'config': Object.assign(defaultParams, providersOrConfig)
    };

    let params = ((p: any = providersOrConfig) => {
      if (Array.isArray(p) === true) {
        return method['providers?'];
      } else {
        return method['config'];
      }
    })();

    params.providers.push({
      provide: SkyModalInstance,
      useValue: modalInstance
    });
    params.providers.push({
      provide: SkyModalConfiguation,
      useValue: params
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


  private createHostComponent() {
    if (!SkyModalService.hostComponent) {
      let factory = this.resolver.resolveComponentFactory(SkyModalHostComponent);

      this.adapter.addHostEl();

      let cmpRef = this.appRef.bootstrap(factory);

      SkyModalService.hostComponent = cmpRef.instance;
    }
  }
}
