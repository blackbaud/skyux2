import {
  SkyConfirmConfig,
  SkyConfirmType,
  SkyConfirmButtonConfig
} from './types';

export class SkyConfirmModalContext implements SkyConfirmConfig {
  public message: string;
  public buttons: SkyConfirmButtonConfig[];
  public type: SkyConfirmType;
}
