import {
  Injectable,
  ElementRef
} from '@angular/core';

@Injectable()
export class SkyModalComponentAdapterService {
  constructor(
  ) { }

  public handleWindowChange(modalEl: ElementRef): void {
    const modalClass = 'sky-modal-body-open';
    if (isAdd) {
      document.body.classList.add(modalClass);
    } else {
      document.body.classList.remove(modalClass);
    }
  }
}
