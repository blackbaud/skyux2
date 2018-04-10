import { SkyToastType } from './toast-message-type';

export interface ToastConfig {
  message?: string,
  disableTimeout?: boolean,
  timeout?: number,
  toastType?: SkyToastType
}