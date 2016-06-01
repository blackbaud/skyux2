import { Injectable, Optional } from '@angular/core';

@Injectable()
export class SkyLogService {
  constructor(@Optional() private window: Window) {
    this.window = this.window || window;
  }

  public warn(message?: any, ...optionalParams: any[]) {
    if (this.window.console) {
      this.window.console.warn.apply(this, arguments);
    }
  }
}
