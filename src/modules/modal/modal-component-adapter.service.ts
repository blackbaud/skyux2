import {
  Injectable,
  ElementRef
} from '@angular/core';

@Injectable()
export class SkyModalComponentAdapterService {
  constructor(
  ) { }

  public handleWindowChange(modalEl: ElementRef): void {
    let boundedHeightEl = modalEl.nativeElement.querySelector('.sky-modal');
    let fullPageModalEl = modalEl.nativeElement.querySelector('.sky-modal-full-page');
    /*
      Set modal height equal to max height of window (accounting for padding above and below modal)
    */
    let newHeight = window.innerHeight - 40;

    boundedHeightEl.style.maxHeight = newHeight.toString() + 'px';
    if (fullPageModalEl) {
      fullPageModalEl.style.height = window.innerHeight.toString() + 'px';
      fullPageModalEl.style.maxHeight = window.innerHeight.toString() + 'px';
    }
  }
}
