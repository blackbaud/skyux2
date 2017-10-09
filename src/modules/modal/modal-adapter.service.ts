import {
  Injectable,
  Renderer2
} from '@angular/core';

import { SkyWindowRefService } from '../window';

@Injectable()
export class SkyModalAdapterService {
  private static readonly MODAL_BODY_FULL_CLASS = 'sky-modal-body-full-page';
  private static readonly MODAL_BODY_CLASS = 'sky-modal-body-open';

  private bodyEl: HTMLElement;

  constructor(
    private renderer: Renderer2,
    private windowRef: SkyWindowRefService) {
    this.bodyEl = this.windowRef.getWindow().document.body;
  }

  public addHostEl(): void {
    this.bodyEl.appendChild(document.createElement('sky-modal-host'));
  }

  public removeHostEl(): void {
    this.bodyEl.removeChild(document.querySelector('sky-modal-host'));
  }

  public toggleFullPageModalClass(isAddFull: boolean): void {
    if (isAddFull) {
      this.addClassToBody(SkyModalAdapterService.MODAL_BODY_FULL_CLASS);
    } else {
      this.removeClassFromBody(SkyModalAdapterService.MODAL_BODY_FULL_CLASS);
    }
  }

  public setPageScroll(isAdd: boolean): void {
    if (isAdd) {
      this.addClassToBody(SkyModalAdapterService.MODAL_BODY_CLASS);
    } else {
      this.removeClassFromBody(SkyModalAdapterService.MODAL_BODY_CLASS);
    }
  }

  public getModalOpener(): HTMLElement {
    return <HTMLElement>document.activeElement;
  }

  private addClassToBody(className: string): void {
    this.renderer.addClass(this.bodyEl, className);
  }

  private removeClassFromBody(className: string): void {
    this.renderer.removeClass(this.bodyEl, className);
  }
}
