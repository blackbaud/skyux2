import {
  ElementRef,
  Injectable,
  Renderer
} from '@angular/core';


@Injectable()
export class SkyWaitAdapterService {

  constructor(private renderer: Renderer) { }

  public setWaitBounds(waitEl: ElementRef) {
    this.renderer.setElementStyle(waitEl.nativeElement.parentElement, 'position', 'relative');
  }

  public removeWaitBounds(waitEl: ElementRef) {
    this.renderer.setElementStyle(waitEl.nativeElement.parentElement, 'position', '');
  }
}
