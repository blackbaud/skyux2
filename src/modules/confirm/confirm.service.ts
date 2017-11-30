import { Injectable } from '@angular/core';

import { SkyModalService } from '../modal';

import { SkyConfirmConfig } from './types/confirm-config';
import { SkyConfirmInstance } from './confirm-instance';

@Injectable()
export class SkyConfirmService {
  constructor(
    private modalService: SkyModalService
  ) { }

  public open(config: SkyConfirmConfig): SkyConfirmInstance {
    const instance = new SkyConfirmInstance();

    return instance.open(this.modalService, config);
  }
}
