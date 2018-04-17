import { SkyToastType } from './toast-message-type';
import { Type, Provider } from '@angular/core';

export interface SkyToastConfig {
  message?: string;
  customComponentType?: Type<any>;
  providers?: Provider[];
  toastType?: SkyToastType;
}
