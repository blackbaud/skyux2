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

  public setFlyoutFocus(flyoutEl: ElementRef): void {
    /* istanbul ignore else */
    /* handle the case where somehow there is a focused element already in the flyout */
    if (!(document.activeElement && flyoutEl.nativeElement.contains(document.activeElement))) {
      let inputWithAutofocus = flyoutEl.nativeElement.querySelector('[autofocus]');

      if (inputWithAutofocus) {
        inputWithAutofocus.focus();
      } else {
        let focusEl: HTMLElement = flyoutEl.nativeElement.querySelector('.sky-flyout');
        focusEl.focus();

      }
    }
  }

  public adjustHeaderForHelp() {
    let helpWidget = document.querySelector('#bb-help-invoker');
    if (helpWidget) {
      let header = document.querySelector('.sky-flyout-header');
      header.classList.add('help-shim');
    }
  }
}
