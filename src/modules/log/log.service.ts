import { Injectable } from '@angular/core';

@Injectable()
export class SkyLogService {
  public warn(message?: any, ...optionalParams: any[]) {
    if (window.console) {
      window.console.warn.apply(this, arguments);
    }
  }
}
