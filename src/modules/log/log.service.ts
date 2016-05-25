import { Injectable } from '@angular/core';

@Injectable()
export class SkyLogService {
  public warn(message?: any, ...optionalParams: any[]) {
    console.warn(message, optionalParams);
  }
}
