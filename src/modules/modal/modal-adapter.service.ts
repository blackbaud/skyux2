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

  public setPageScroll(isAdd: boolean, isFullPage: boolean): void {
    const modalBodyClasses = ['sky-modal-body-open'];

    if (isFullPage) {
      modalBodyClasses.push('sky-modal-body-full-page');
    }

    if (isAdd) {
      // Use forEach and add one class a time for IE / older Firefox support.
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
      // https://bugzilla.mozilla.org/show_bug.cgi?id=814014
      modalBodyClasses.forEach(bodyClass => {
        document.body.classList.add(bodyClass);
      });
    } else {
      modalBodyClasses.forEach(bodyClass => {
        document.body.classList.remove(bodyClass);
      });
    }
  }

  public getModalOpener(): HTMLElement {
    return <HTMLElement>document.activeElement;
  }
}
