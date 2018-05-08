
import {
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

import {
  SkyWindowRefService
} from '../window';

@Injectable()
export class SkyOverlayDomAdapterService {
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
    const documentObj = this.windowRef.getWindow().document;
    const hostElement = document.querySelector('sky-overlay');
    this.renderer.removeChild(documentObj.body, hostElement);
  }
}
