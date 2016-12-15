import {
  ApplicationRef,
  Injectable,
  Injector
} from '@angular/core';

@Injectable()
export class SkyModalAdapterService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  public addHostEl(): void {
    document.body.appendChild(document.createElement('sky-modal-host'));
  }

  public removeHostEl(): void {
    document.body.removeChild(document.querySelector('sky-modal-host'));
  }

  public setPageScroll(isAdd: boolean): void {
    const modalClass = 'sky-modal-body-open';
    if(isAdd) {
      document.body.classList.add(modalClass);
    } else {
      document.body.classList.remove(modalClass);
    }
  }
}
