import {
  EventEmitter
} from '@angular/core';

export class SkyFlyoutInstance {
  public componentInstance: any;

  public closed = new EventEmitter<void>();

  public close() {

    this.closed.emit();
    this.closed.complete();
  }

}
