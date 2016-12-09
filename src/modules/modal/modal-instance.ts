import {
  EventEmitter
} from '@angular/core';

export class SkyModalInstance {
  public componentInstance: any;

  public instanceClose = new EventEmitter<any>();

  private closeCallback: Function;

  constructor() {}

  public setCloseCallback(closeCallback: Function) {
    this.closeCallback = closeCallback;
  }

  public close(result?: any) {
    if (this.closeCallback) {
      this.closeCallback();
    }
    this.instanceClose.emit(result);
  }
}
