import { Injectable } from '@angular/core';
import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyConfirmationDialogInstance } from './confirmation-dialog.instance';
import { SkyModalService } from '../modal/modal.service';

@Injectable()
export class SkyConfirmationDialogService {
  constructor(private modal: SkyModalService) {}

  public open(config: SkyConfirmationDialogConfig): SkyConfirmationDialogInstance {
    let instance = new SkyConfirmationDialogInstance();

    return instance.open(this.modal, config);
  }
}
