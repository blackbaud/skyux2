import {
  ElementRef,
  Injectable,
  Renderer
} from '@angular/core';
import { SkyWindowRefService } from '../window';

@Injectable()
export class SkyWaitAdapterService {
  private parentListeners: {[key: string]: Function[]} = {};

  constructor(
    private renderer: Renderer,
    private windowRef: SkyWindowRefService
  ) { }

  public setWaitBounds(waitEl: ElementRef) {
    this.renderer.setElementStyle(waitEl.nativeElement.parentElement, 'position', 'relative');
  }

  public removeWaitBounds(waitEl: ElementRef) {
    this.renderer.setElementStyle(waitEl.nativeElement.parentElement, 'position', undefined);
  }

  public setBusyState(waitEl: ElementRef, isFullPage: boolean, isWaiting: boolean, id: string) {
    let busyEl = isFullPage ? document.body : waitEl.nativeElement.parentElement;
    let state = isWaiting ? 'true' : undefined;
    this.renderer.setElementAttribute(busyEl, 'aria-busy', state);

    // Manage tab navigation in the parent element
    if (isWaiting) {
      let endListenerFunc = this.renderer.listen(busyEl, 'keydown', (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === 'tab') {
          event.preventDefault();
          if (!isFullPage) {
            this.focusNextElement(busyEl, event.shiftKey);
          }
        }
      });
      this.parentListeners[id] = [endListenerFunc];

      if (!isFullPage) {
        let focusListenerFunc = this.renderer.listen(this.windowRef.getWindow(), 'keyup', (event: any) => {
          if (event.key.toLowerCase() === 'tab' && busyEl.contains(document.activeElement)) {
            this.focusNextElement(busyEl, event.shiftKey);
          }
        });
        this.parentListeners[id].push(focusListenerFunc);
      }
    } else if (id in this.parentListeners) {
      for (let listener of this.parentListeners[id]) {
        listener();
      }
      delete this.parentListeners[id];
    }
  }

  private focusNextElement(parentElement: any, shiftKey: boolean): void {
    // Select all possible focussable elements
    let focussableElements =
      'a:not([disabled]):not([tabindex="-1"]), ' +
      'button:not([disabled]):not([tabindex="-1"]), ' +
      'input:not([disabled]):not([tabindex="-1"]), ' +
      'textarea:not([disabled]):not([tabindex="-1"]), ' +
      '[tabindex]:not([disabled]):not([tabindex="-1"])';

    let focussable = Array.prototype.filter.call(document.body.querySelectorAll(focussableElements),
      (element: any) => {
        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
      });

    // If shift tab, go in the other direction
    let modifier = 1;
    if (shiftKey) {
      modifier = -1;
    }

    // Find the next navigable element that isn't waiting
    let curIndex = focussable.indexOf(document.activeElement) + modifier;
    while (!focussable[curIndex] || parentElement.contains(focussable[curIndex]) || parentElement === focussable[curIndex]) {
      curIndex += modifier;
    }
    if (focussable[curIndex]) {
      focussable[curIndex].focus();
    }
  }
}
