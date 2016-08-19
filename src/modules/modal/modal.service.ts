import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Type
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
  ) { }

  public open(component: Type, providers?: any[]): SkyModalInstance {
    let modalInstance = new SkyModalInstance();

    if (!SkyModalService.hostComponent) {
      let factory = this.resolver.resolveComponentFactory(SkyModalHostComponent);

      this.adapter.addHostEl();

      let cmpRef = this.appRef.bootstrap(factory);

      SkyModalService.hostComponent = cmpRef.instance;
    }

    SkyModalService.hostComponent.open(modalInstance, component, providers);

    return modalInstance;
  }
}
