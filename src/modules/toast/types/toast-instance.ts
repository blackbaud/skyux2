import {
  Type,
  Provider,
  EventEmitter
} from '@angular/core';

export class SkyToastInstance {
  public isClosed = new EventEmitter();
  public isOpen = true;

  constructor(
    public message: string,
    public customComponentType: Type<any>,
    public toastType: 'info' | 'success' | 'warning' | 'danger',
    public providers: Provider[] = []
  ) {}

  public close = () => {
    this.isOpen = false;
  }
}
