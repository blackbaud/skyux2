import { Injectable } from '@angular/core';
import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyConfirmationDialogFormComponent } from './confirmation-dialog-form.component';
import { SkyModalInstance } from '../modal/modal-instance';
import { SkyModalService } from '../modal/modal.service';

@Injectable()
export class SkyConfirmationDialogService {
  constructor(private modal: SkyModalService) {}

  public open(config: SkyConfirmationDialogConfig): SkyModalInstance {
    const options: any = {
      providers: [{ provide: SkyConfirmationDialogConfig, useValue: config }]
    };

    return this.modal.open(SkyConfirmationDialogFormComponent, options);
  }
}
