import { Injectable, EventEmitter } from '@angular/core';

import {
  SkyModalService,
  SkyModalInstance
} from '../modal';

import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyConfirmationDialogComponent } from './confirmation-dialog.component';
import { SkyConfirmationDialogButton } from './confirmation-dialog-button';

@Injectable()
export class SkyConfirmationDialogInstance {
  public closed = new EventEmitter<string>();
  public confirmed = new EventEmitter<SkyConfirmationDialogButton>();
  public modalInstance: SkyModalInstance;

  public open(
    modal: SkyModalService,
    config: SkyConfirmationDialogConfig
  ): SkyConfirmationDialogInstance {

    const options: any = {
      providers: [{
        provide: SkyConfirmationDialogConfig,
        useValue: config
      }]
    };

    this.modalInstance = modal.open(SkyConfirmationDialogComponent, options);

    this.modalInstance.closed.subscribe((result: any) => {
      // The modal was closed using the ESC key:
      if (result.data === undefined) {
        result.data = {
          text: '',
          action: 'cancel'
        } as SkyConfirmationDialogButton;
      }

      this.confirmed.emit(result.data);

      // TODO: This emitter is deprecated:
      this.closed.emit(result.data.text);
    });

    return this;
  }
}
