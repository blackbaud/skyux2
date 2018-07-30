import {
  ElementRef,
  Injectable,
  Renderer
} from '@angular/core';

@Injectable()
export class SkyWaitAdapterService {
  private parentListeners: {[key: string]: Function} = {};

  constructor(private renderer: Renderer) { }

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
        }
      });
      this.parentListeners[id] = endListenerFunc;
    } else if (id in this.parentListeners) {
      this.parentListeners[id]();
      delete this.parentListeners[id];
    }
  }
}
