import {
  SkyConfirmationDialogType
} from './confirmation-dialog-type';

import {
  SkyConfirmationDialogButtonConfig
} from './confirmation-dialog-button-config';

export class SkyConfirmationDialogConfig {
  public message: string;
  public type: SkyConfirmationDialogType;
  public buttons?: SkyConfirmationDialogButtonConfig[];
}
