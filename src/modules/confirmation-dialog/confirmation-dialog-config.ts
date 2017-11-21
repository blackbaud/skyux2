import { SkyConfirmationDialogType } from './confirmation-dialog-type';
import { SkyConfirmationDialogButton } from './confirmation-dialog-button';

export class SkyConfirmationDialogConfig {
  public message: string;
  public buttons: Array<SkyConfirmationDialogButton>;
  public type: SkyConfirmationDialogType;
}
