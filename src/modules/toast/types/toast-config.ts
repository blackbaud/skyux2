import { SkyToastType } from './toast-message-type';
import { Type } from '@angular/core';

export interface ToastConfig {
  message?: string,
  customComponentType?: Type<any>,
  disableTimeout?: boolean,
  timeout?: number,
  toastType?: SkyToastType
}