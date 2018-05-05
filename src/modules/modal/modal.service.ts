import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable
} from '@angular/core';

import { SkyModalInstance } from './modal-instance';
import { SkyModalHostComponent } from './modal-host.component';
import { SkyModalAdapterService } from './modal-adapter.service';
import { SkyModalConfigurationInterface as IConfig } from './modal.interface';

@Injectable()
export class SkyModalService {
  private static hostComponent: SkyModalHostComponent;
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private adapter: SkyModalAdapterService
  ) {
    /*
      This timeout is needed because you can run into errors like 'ApplicationRef.tick is called
      recursively' when the modal service is injected into a component hidden by an *ngIf.
    */
    setTimeout(() => {
      this.createHostComponent();
    });
  }

  // Open Overloads
  public open(component: any, providers?: any[]): SkyModalInstance;
  public open(component: any, config?: IConfig): SkyModalInstance;

  // Open Method
  public open(): SkyModalInstance {
    const modalInstance = new SkyModalInstance();
    this.createHostComponent();
    const providersOrConfig: IConfig = arguments[1];
    const params = this.getConfigFromParameter(providersOrConfig);
    const component = arguments[0];

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
    const defaultParams: IConfig = {
      'providers': [],
      'fullPage': false,
      'size': 'medium',
      'tiledBody': false
    };
    let params: any;
    let method: any;

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
      const factory = this.resolver.resolveComponentFactory(SkyModalHostComponent);

      this.adapter.addHostEl();

      const cmpRef = this.appRef.bootstrap(factory);

      SkyModalService.hostComponent = cmpRef.instance;
    }
  }
}
