import { Injectable, Optional } from '@angular/core';

@Injectable()
export class SkyLogService {
  constructor(@Optional() private logWindow: Window) {
    this.logWindow = this.logWindow || window;
  }

  public warn(message?: any, ...optionalParams: any[]) {
    if (this.logWindow.console) {
      this.logWindow.console.warn.apply(this, arguments);
    }
  }
}
