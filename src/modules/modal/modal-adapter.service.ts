import {
  Injectable
} from '@angular/core';

@Injectable()
export class SkyModalAdapterService {
  public addHostEl(): void {
    document.body.appendChild(document.createElement('sky-modal-host'));
  }

  public removeHostEl(): void {
    document.body.removeChild(document.querySelector('sky-modal-host'));
  }

  public setPageScroll(isAdd: boolean): void {
    const modalClass = 'sky-modal-body-open';
    if (isAdd) {
      document.body.classList.add(modalClass);
    } else {
      document.body.classList.remove(modalClass);
    }
  }

  public getModalOpener(): HTMLElement {
    return <HTMLElement>document.activeElement;
  }
}
