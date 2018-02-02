import {
  Injectable,
  ElementRef
} from '@angular/core';

import { SkyWindowRefService } from '../window';

@Injectable()
export class SkyFlyoutAdapterService {

  private docRef: any;
  private bodyEl: HTMLElement;

  constructor(
    private windowRef: SkyWindowRefService
  ) {
      this.docRef = this.windowRef.getWindow().document;
      this.bodyEl = this.windowRef.getWindow().document.body;
  }

  public addHostEl(): void {
    this.bodyEl.appendChild(this.docRef.createElement('sky-flyout'));
  }

  public removeHostEl(): void {
    this.bodyEl.removeChild(this.docRef.querySelector('sky-flyout'));
  }

  public getCurrentActiveElement(): HTMLElement {
    return <HTMLElement>this.docRef.activeElement;
  }

  public adjustHeaderForHelp() {
    const helpWidget = document.querySelector('#bb-help-invoker');
    if (helpWidget) {
      const header = document.querySelector('.sky-flyout-header');
      header.classList.add('sky-flyout-help-shim');
    }
  }
}
