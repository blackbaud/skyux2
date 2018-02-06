import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';

import { SkyFlyoutAdapterService } from './flyout-adapter.service';
import { SkyFlyoutComponent } from './flyout.component';
import { SkyFlyoutInstance } from './flyout-instance';

import {
  SkyFlyoutConfig
} from './types';

@Injectable()
export class SkyFlyoutService {
  private host: ComponentRef<SkyFlyoutComponent>;

  constructor(
    private adapter: SkyFlyoutAdapterService,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  public open<T>(component: Type<T>, config?: SkyFlyoutConfig): SkyFlyoutInstance<T> {
    if (!this.host) {
      this.host = this.createHostComponent();
    }

    return this.host.instance.attach<T>(component, config);
  }

  public dispose(): void {
    if (this.host) {
      this.adapter.removeHostElement();
      this.appRef.detachView(this.host.hostView);
      this.host.destroy();
      this.host = undefined;
    }
  }

  private createHostComponent(): ComponentRef<SkyFlyoutComponent> {
    const componentRef = this.resolver
      .resolveComponentFactory(SkyFlyoutComponent)
      .create(this.injector);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];

    this.appRef.attachView(componentRef.hostView);
    this.adapter.appendToBody(domElem);

    return componentRef;
  }
}
