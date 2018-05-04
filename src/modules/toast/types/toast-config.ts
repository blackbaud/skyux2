import {
  Type,
  Provider
} from '@angular/core';

import {
  SkyToastType
} from './toast-type';

export interface SkyToastConfig {
  message?: string;
  customComponentType?: Type<any>;
  providers?: Provider[];
  toastType?: SkyToastType;
}
