import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import { SkyFlyoutComponent } from './index';
import { SkyWindowRefService } from '../window';

@Injectable()
export class SkyFlyoutAdapterService {

  private renderer: Renderer2;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
    private resolver: ComponentFactoryResolver,
    private windowRef: SkyWindowRefService
  ) {
      this.renderer = this.rendererFactory.createRenderer(this.windowRef.getWindow().document.body, undefined);
  }

  public appendHostEl(): ComponentRef<SkyFlyoutComponent> {
    const componentRef = this.resolver
      .resolveComponentFactory(SkyFlyoutComponent)
      .create(this.injector);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    const windowObj = this.windowRef.getWindow();
    this.renderer.appendChild(windowObj.document.body, domElem);

    return componentRef;
  }

  public removeHostEl(componentRef: ComponentRef<SkyFlyoutComponent>): void {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

  public getCurrentActiveElement(): HTMLElement {
    const docObj = this.windowRef.getWindow().document;
    return <HTMLElement> docObj.activeElement;
  }

  public adjustHeaderForHelp() {
    const helpWidget = document.querySelector('#bb-help-invoker');
    if (helpWidget) {
      const header = document.querySelector('.sky-flyout-header');
      this.renderer.addClass(header, 'sky-flyout-help-shim');
    }
  }
}
