import {
  Type
} from '@angular/core';

export interface SkyToastConfig {
  message?: string;
  customComponentType?: Type<any>;
  toastType?: 'info' | 'success' | 'warning' | 'danger';
}
