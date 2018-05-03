import {
  SkyToastType
} from './toast-type';
import {
  Type,
  Provider
} from '@angular/core';

export interface SkyToastConfig {
  message?: string;
  customComponentType?: Type<any>;
  providers?: Provider[];
  toastType?: SkyToastType;
}
