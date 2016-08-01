import {
  ApplicationRef,
  ComponentFactory,
  ComponentResolver,
  Injectable,
  Injector,
  Type
} from '@angular/core';

import { SkyModalInstance } from './modal-instance';
import { SkyModalHostComponent } from './modal-host.component';

@Injectable()
export class SkyModalService {
  private static hostComponent: SkyModalHostComponent;

  constructor(
    private resolver: ComponentResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  public open(component: Type) {
    function showComponent() {
      SkyModalService.hostComponent.show(component);
    }

    let modalInstance = new SkyModalInstance();

    if (SkyModalService.hostComponent) {
      showComponent();
    } else {
      this.resolver.resolveComponent(SkyModalHostComponent)
        .then((factory: ComponentFactory<SkyModalHostComponent>) => {
          let cmpRef = factory.create(this.injector);

          SkyModalService.hostComponent = cmpRef.instance;

          (<any>this.appRef)._loadComponent(cmpRef);

          SkyModalService.hostComponent.init();

          showComponent();
        });
    }

    return modalInstance;
  }
}
