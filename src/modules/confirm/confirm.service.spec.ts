import { SkyConfirmService } from './confirm.service';

import {
  SkyConfirmConfig,
  SkyConfirmType
} from './types';

import { MockModalService } from './fixtures/mocks';
import { SkyConfirmComponent } from './confirm.component';
import { SkyConfirmModalContext } from './confirm-modal-context';

describe('Confirm service', () => {
  it('should open confirmation dialog with correct parameters', () => {
    const modalService = new MockModalService(undefined, undefined, undefined);

    const config: SkyConfirmConfig = {
      message: 'dialog description',
      type: SkyConfirmType.YesCancel,
      buttons: [
        { text: 'yes' },
        { text: 'cancel' }
      ]
    };

    const expectedConfig = {
      providers: [{
        provide: SkyConfirmModalContext,
        useValue: config
      }]
    };

    const service = new SkyConfirmService(modalService);

    service.open(config);

    expect(modalService.openCalls.length).toBe(1);
    expect(modalService.openCalls[0].component).toBe(SkyConfirmComponent);
    expect(modalService.openCalls[0].config).toEqual(expectedConfig);
  });
});
