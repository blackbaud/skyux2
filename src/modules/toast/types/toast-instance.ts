import {
  Type,
  Provider,
  EventEmitter
} from '@angular/core';

import {
  Subject
} from 'rxjs';

export class SkyToastInstance {
  public isClosed = new EventEmitter();
  public isClosing = new Subject();

  constructor(
    public message: string,
    public customComponentType: Type<any>,
    public toastType: string,
    public providers: Provider[] = [],
    private removeFromQueue: Function
  ) {}

  public close = () => {
    if (!this.isClosing.isStopped) {
      this.isClosing.next();
      this.isClosing.complete();

      this.isClosed.subscribe(() => {
        this.removeFromQueue(this);
        this.isClosed.complete();
      });
    }
  }
}
