import {
  EventEmitter
} from '@angular/core';

import {
  SkyModalCloseArgs
} from './modal-close-args';

export class SkyModalInstance {
  public componentInstance: any;

  public closed = new EventEmitter<SkyModalCloseArgs>();

  public close(result?: any, reason?: string) {
    if (reason === undefined) {
      reason = 'close';
    }

    this.closeModal(reason, result);
  }

  public cancel(result?: any) {
    this.closeModal('cancel', result);
  }

  public save(result?: any) {
    this.closeModal('save', result);
  }

  private closeModal(type: string, result?: any) {
    const args = new SkyModalCloseArgs();

    args.reason = type;
    args.data = result;

    this.closed.emit(args);
  }

}
