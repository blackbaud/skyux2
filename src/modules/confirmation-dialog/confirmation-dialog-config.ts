import { SkyConfirmationDialogType } from './confirmation-dialog-type';
import { SkyConfirmationDialogButton } from './confirmation-dialog-form.component';

export class SkyConfirmationDialogConfig {
  public description: string;
  public buttons: Array<SkyConfirmationDialogButton>;
  public type: SkyConfirmationDialogType;
}
