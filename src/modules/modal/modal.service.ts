import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector
} from '@angular/core';

import { SkyModalInstance } from './modal-instance';
import { SkyModalHostComponent } from './modal-host.component';
import { SkyModalAdapterService } from './modal-adapter.service';

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

  public open(component: any, providers?: any[]): SkyModalInstance {
    let modalInstance = new SkyModalInstance();

    this.createHostComponent();

    providers = providers || [];

    providers.push({
      provide: SkyModalInstance,
      useValue: modalInstance
    });

    SkyModalService.hostComponent.open(modalInstance, component, providers);

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
