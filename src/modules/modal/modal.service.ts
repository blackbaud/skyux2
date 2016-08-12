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

    function openModal() {
      SkyModalService.hostComponent.open(modalInstance, component, providers);
    }

    if (SkyModalService.hostComponent) {
      openModal();
    } else {
      let appViewContainerRef = this.adapter.getModalHostViewContainer(this.injector);

      let factory = this.resolver.resolveComponentFactory(SkyModalHostComponent);
      let cmpRef = appViewContainerRef.createComponent(factory, undefined, this.injector);

      SkyModalService.hostComponent = cmpRef.instance;

      SkyModalService.hostComponent.init();

      openModal();
    }

    return modalInstance;
  }
}
