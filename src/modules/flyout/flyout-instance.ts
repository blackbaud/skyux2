import {
  EventEmitter
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  SkyFlyoutMessage,
  SkyFlyoutMessageType
} from './types';

export class SkyFlyoutInstance {
  public isOpen = false;
  public closed = new EventEmitter<void>();
  public opened = new EventEmitter<void>();
  public messageStream = new Subject<SkyFlyoutMessage>();
  public componentInstance: any;

  constructor() {
    this.opened.subscribe(() => {
      this.isOpen = true;
    });

    this.closed.subscribe(() => {
      this.isOpen = false;
    });
  }

  public open() {
    this.messageStream.next({
      type: SkyFlyoutMessageType.Open
    });
  }

  public close() {
    this.messageStream.next({
      type: SkyFlyoutMessageType.Close
    });
  }

  public toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}
