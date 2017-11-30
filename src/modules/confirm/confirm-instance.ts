import {
  EventEmitter,
  Injectable
} from '@angular/core';

import {
  SkyModalCloseArgs,
  SkyModalInstance,
  SkyModalService
} from '../modal';

import {
  SkyConfirmCloseEventArgs,
  SkyConfirmConfig
} from './types';

import { SkyConfirmModalContext } from './confirm-modal-context';
import { SkyConfirmComponent } from './confirm.component';

@Injectable()
export class SkyConfirmInstance {
  public closed = new EventEmitter<SkyConfirmCloseEventArgs>();

  public open(
    modalService: SkyModalService,
    config: SkyConfirmConfig
  ): SkyConfirmInstance {

    const instance: SkyModalInstance = modalService.open(
      SkyConfirmComponent,
      {
        providers: [{
          provide: SkyConfirmModalContext,
          useValue: config
        }]
      }
    );

    instance.closed.subscribe((args: SkyModalCloseArgs) => {
      let result: SkyConfirmCloseEventArgs = args.data;

      // The modal was closed using the ESC key.
      if (result === undefined) {
        result = {
          action: 'cancel'
        };
      }

      this.closed.emit(result);
      this.closed.complete();
    });

    return this;
  }
}
