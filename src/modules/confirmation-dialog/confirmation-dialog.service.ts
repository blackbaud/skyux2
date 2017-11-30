import { Injectable } from '@angular/core';

import { SkyModalService } from '../modal/modal.service';

import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyConfirmationDialogInstance } from './confirmation-dialog.instance';

@Injectable()
export class SkyConfirmationDialogService {
  constructor(
    private modal: SkyModalService
  ) { }

  public open(config: SkyConfirmationDialogConfig): SkyConfirmationDialogInstance {
    const instance = new SkyConfirmationDialogInstance();

    if (config.buttons === undefined) {
      config.buttons = [];
    }

    return instance.open(this.modal, config);
  }
}
