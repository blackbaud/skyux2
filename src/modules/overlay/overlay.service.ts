import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  OnDestroy,
  Type
} from '@angular/core';

import { SkyOverlayConfig } from './overlay-config';
import { SkyOverlayDomAdapterService } from './overlay-dom-adapter.service';
import { SkyOverlayInstance } from './overlay-instance';
import { SkyOverlayComponent } from './overlay.component';

@Injectable()
export class SkyOverlayService implements OnDestroy {
  private host: ComponentRef<SkyOverlayComponent>;

  constructor(
    private adapter: SkyOverlayDomAdapterService,
    private appRef: ApplicationRef,
    private injector: Injector,
    private resolver: ComponentFactoryResolver
  ) { }

  public ngOnDestroy(): void {
    this.removeHostComponent();
  }

  public attach<T>(component: Type<T>, config?: SkyOverlayConfig): SkyOverlayInstance<T> {
    this.ensureHostExists();

    return this.host.instance.attach(component, config);
  }

  private createHostComponent(): ComponentRef<SkyOverlayComponent> {
    const componentRef = this.resolver
      .resolveComponentFactory(SkyOverlayComponent)
      .create(this.injector);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0];

    this.appRef.attachView(componentRef.hostView);
    this.adapter.appendToBody(domElem);

    return componentRef;
  }

  private ensureHostExists(): ComponentRef<SkyOverlayComponent> {
    if (!this.host) {
      this.host = this.createHostComponent();
    }

    return this.host;
  }

  private removeHostComponent(): void {
    if (this.host) {
      this.appRef.detachView(this.host.hostView);
      this.host.destroy();
      this.host = undefined;
    }

    this.adapter.removeHostElement();
  }
}
