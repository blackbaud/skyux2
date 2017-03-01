import {
  EventEmitter,
  Injectable
} from '@angular/core';

import { SkyModalComponent } from './modal.component';

@Injectable()
export class SkyModalHostService {
  public static get openModalCount(): number {
    return SkyModalHostService.modalHosts.length;
  }

  private static get BASE_Z_INDEX(): number {
    return 1040;
  }

  public static get backdropZIndex(): number {
    return SkyModalHostService.BASE_Z_INDEX + SkyModalHostService.modalHosts.length * 10;
  }

  private static modalHosts: SkyModalHostService[] = [];

  public close = new EventEmitter<SkyModalComponent>();

  public constructor() {
    SkyModalHostService.modalHosts.push(this);
  }

  public getModalZIndex(): number {
    let zIndex = SkyModalHostService.BASE_Z_INDEX + 1;
    zIndex += (SkyModalHostService.modalHosts.indexOf(this) + 1) * 10;
    return zIndex;
  }


  public onClose(modalComponent: SkyModalComponent): void {
    this.close.emit(modalComponent);
  }

  public destroy(): void {
    SkyModalHostService.modalHosts.splice(SkyModalHostService.modalHosts.indexOf(this));
  }
}
