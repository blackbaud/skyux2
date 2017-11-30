import { SkyConfirmationDialogType } from './confirmation-dialog-type';

export class SkyConfirmationDialogConfig {
  public message: string;
  public type: SkyConfirmationDialogType;
  public buttons?: {
    text?: string;
    autofocus?: boolean;
  }[];
}
