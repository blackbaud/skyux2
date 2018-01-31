import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {
  SkyOverlayComponent
} from './overlay.component';

@Injectable()
export class SkyOverlayService {
  private host: SkyOverlayComponent;
  private renderer: Renderer2;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2
  ) {
    /* tslint:disable-next-line:no-null-keyword */
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public append(element: any) {
    // if (!this.host) {
      this.createHostElement();
    // }

    this.renderer.appendChild(
      this.host.target.nativeElement,
      element
    );
  }

  private createHostElement() {
    // 1. Create a component reference from the component
    const componentRef = this.resolver
      .resolveComponentFactory(SkyOverlayComponent)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    this.host = componentRef.instance;
  }
}
