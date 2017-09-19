import {
  EventEmitter,
  Injectable
} from '@angular/core';

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

  public static get topModal(): SkyModalHostService {
    return SkyModalHostService.modalHosts[SkyModalHostService.modalHosts.length - 1];
  }

  private static modalHosts: SkyModalHostService[] = [];

  public close = new EventEmitter<void>();

  public constructor() {
    SkyModalHostService.modalHosts.push(this);
  }

  public getModalZIndex(): number {
    let zIndex = SkyModalHostService.BASE_Z_INDEX + 1;
    zIndex += (SkyModalHostService.modalHosts.indexOf(this) + 1) * 10;
    return zIndex;
  }

  public onClose(): void {
    this.close.emit();
  }

  public destroy(): void {
    SkyModalHostService.modalHosts.splice(SkyModalHostService.modalHosts.indexOf(this));
  }
}
