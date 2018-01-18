import { SkyFlyoutComponent } from './flyout.component';
import {
  Injectable, ComponentFactoryResolver, ReflectiveInjector, Injector, ApplicationRef, EmbeddedViewRef, ComponentRef
} from '@angular/core';

import { SkyWindowRefService } from '../window';
import { SkyFlyoutInstance } from './flyout-instance';
import { SkyFlyoutConfigurationInterface as IConfig } from './flyout.interface';

@Injectable()
export class SkyFlyoutAdapterService {

  private docRef: any;
  private bodyEl: HTMLElement;

  private attachedComponentRef: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private windowRef: SkyWindowRefService
  ) {
      this.docRef = this.windowRef.getWindow().document;
      this.bodyEl = this.windowRef.getWindow().document.body;
  }

  public addFlyout(modalInstance: SkyFlyoutInstance, component: any, config: IConfig): void {
    let factory = this.resolver.resolveComponentFactory(component);

    let providers = config.providers /* istanbul ignore next */ || [];
    let resolvedProviders = ReflectiveInjector.resolve(providers);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, this.injector);
    let componentRef = factory.create(injector);

    this.appRef.attachView(componentRef.hostView);

    let domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    if (this.attachedComponentRef) {
      this.removeFlyout();
    }

    this.bodyEl.appendChild(domElem);

    this.attachedComponentRef = componentRef;
    let newFlyout: SkyFlyoutComponent = this.attachedComponentRef.instance as SkyFlyoutComponent;
    newFlyout.open();
  }

  public removeFlyout(): void {
    /* istanbul ignore else */
    /* sanity check */
    if (this.attachedComponentRef) {
      this.attachedComponentRef.destroy();
      this.appRef.detachView(this.attachedComponentRef.hostView);
      this.attachedComponentRef = undefined;
    }
  }

  public getModalOpener(): HTMLElement {
    return <HTMLElement>this.docRef.activeElement;
  }

}
