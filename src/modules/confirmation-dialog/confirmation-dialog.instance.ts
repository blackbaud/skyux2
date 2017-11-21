import { Injectable, EventEmitter } from '@angular/core';
import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyConfirmationDialogComponent } from './confirmation-dialog.component';
import { SkyModalService } from '../modal/modal.service';
import { SkyModalInstance } from '../modal/modal-instance';

@Injectable()
export class SkyConfirmationDialogInstance {
  public closed = new EventEmitter<string>();
  public modalInstance: SkyModalInstance;

  public open(modal: SkyModalService, config: SkyConfirmationDialogConfig):
    SkyConfirmationDialogInstance {

    const options: any = {
      providers: [{ provide: SkyConfirmationDialogConfig, useValue: config }]
    };

    this.modalInstance = modal.open(SkyConfirmationDialogComponent, options);

    this.modalInstance.closed.subscribe((result: any) => {
      this.closed.emit(result.data);
    });

    return this;
  }
}
