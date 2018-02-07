import {
  ElementRef,
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import { SkyWindowRefService } from '../window';

@Injectable()
export class SkyFlyoutAdapterService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private windowRef: SkyWindowRefService
  ) {
    this.renderer = this.rendererFactory.createRenderer(undefined, undefined);
  }

  public appendToBody(element: any): void {
    const body = this.windowRef.getWindow().document.body;
    this.renderer.appendChild(body, element);
  }

  public removeHostElement(): void {
    const document = this.windowRef.getWindow().document;
    const hostElement = document.querySelector('sky-flyout');
    this.renderer.removeChild(document.body, hostElement);
  }

  public adjustHeaderForHelp(header: ElementRef): void {
    const windowObj = this.windowRef.getWindow();
    const helpWidget = windowObj.document.getElementById('bb-help-invoker');

    if (helpWidget) {
      this.renderer.addClass(header.nativeElement, 'sky-flyout-help-shim');
    }
  }
}
