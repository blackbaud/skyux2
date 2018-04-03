import { Injectable } from '@angular/core';
import { ErrorModalConfig } from './error-modal-config';
import { SkyErrorModalFormComponent } from './error-modal-form.component';
import { SkyModalService } from '../modal/modal.service';

@Injectable()
export class SkyErrorModalService {
  constructor(private modal: SkyModalService) {}

  public open(config: ErrorModalConfig) {
    const providers = [{ provide: ErrorModalConfig, useValue: config }];

    this.modal.open(SkyErrorModalFormComponent, providers);
  }
}
