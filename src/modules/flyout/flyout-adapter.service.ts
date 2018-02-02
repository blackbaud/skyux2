import {
  ApplicationRef,
  ComponentFactoryResolver,
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
    this.renderer = this.rendererFactory.createRenderer(undefined, undefined);
  }

  public createHostComponent(): SkyFlyoutComponent {
    const componentRef = this.resolver
      .resolveComponentFactory(SkyFlyoutComponent)
      .create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    this.renderer.appendChild(this.windowRef.getWindow().document.body, domElem);

    return componentRef.instance;
  }

  public adjustHeaderForHelp(headerElement: any): void {
    const windowObj = this.windowRef.getWindow();
    const helpWidget = windowObj.document.querySelector('#bb-help-invoker');

    if (helpWidget) {
      this.renderer.addClass(headerElement, 'sky-flyout-help-shim');
    }
  }
}
