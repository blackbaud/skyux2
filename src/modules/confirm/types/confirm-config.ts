import { SkyConfirmType } from './confirm-type';
import { SkyConfirmButtonConfig } from './confirm-button-config';

export interface SkyConfirmConfig {
  message: string;
  buttons?: SkyConfirmButtonConfig[];
  type?: SkyConfirmType;
}
