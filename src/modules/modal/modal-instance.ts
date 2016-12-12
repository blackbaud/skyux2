import {
  EventEmitter
} from '@angular/core';

import {
  SkyModalCloseArgs
} from './modal-close-args';

export class SkyModalInstance {
  public componentInstance: any;

  public closed = new EventEmitter<SkyModalCloseArgs>();

  private closeCallback: Function;

  constructor() {}

  public setCloseCallback(closeCallback: Function) {
    this.closeCallback = closeCallback;
  }

  public close(result?: any, reason?: any) {
    this.closeModal(reason, result);
  }

  public cancel(result?: any) {
    this.closeModal('cancel', result);
  }

  public save(result?: any) {
    this.closeModal('save', result);
  }

  private closeModal(type: string, result?: any) {
    if (this.closeCallback) {
      this.closeCallback();
    }
    this.closed.emit({ reason: type, data: result});
  }

}
