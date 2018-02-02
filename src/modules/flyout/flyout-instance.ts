import { EventEmitter } from '@angular/core';

import { SkyFlyoutService } from './index';

export class SkyFlyoutInstance {
  public componentInstance: any;

  public closed = new EventEmitter<void>();

  constructor(private skyFlyoutService: SkyFlyoutService) {}

  public close() {
    this.skyFlyoutService.close();
  }

}
