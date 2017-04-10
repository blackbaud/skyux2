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
    } else {
      /*
        IE11 doesn't handle flex and max-height correctly so we have to explicitly add
        max-height to the content that accounts for standard header and footer height.
      */
      let modalContentEl = modalEl.nativeElement.querySelector('.sky-modal-content');
      let contentHeight = newHeight - 114;
      modalContentEl.style.maxHeight = contentHeight.toString() + 'px';

    }
  }
}
