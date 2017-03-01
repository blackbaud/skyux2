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
    let boundedHeightE2 = modalEl.nativeElement.querySelector('.sky-modal-full-page');
    /*
      Set modal height equal to max height of window (accounting for padding above and below modal)
    */
    let newHeight = window.innerHeight - 40;

    boundedHeightEl.style.maxHeight = newHeight.toString() + 'px';
    if (boundedHeightE2) {
      boundedHeightE2.style.height = window.innerHeight.toString() + 'px';
      boundedHeightE2.style.maxHeight = window.innerHeight.toString() + 'px';
    }
  }
}
