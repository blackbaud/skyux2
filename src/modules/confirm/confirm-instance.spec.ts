import {
  MockSkyModalService,
  MockSkyModalInstance
} from './fixtures/mocks';

import {
  SkyConfirmInstance
} from './confirm-instance';

import {
  SkyConfirmType,
  SkyConfirmConfig,
  SkyConfirmCloseEventArgs
} from './types';

describe('Confirm instance', () => {
  let instance: SkyConfirmInstance;
  let modalInstance: MockSkyModalInstance;
  let modalService: MockSkyModalService;

  beforeEach(() => {
    instance = new SkyConfirmInstance();
    modalInstance = new MockSkyModalInstance();
    modalService = new MockSkyModalService(undefined, undefined, undefined);
  });

  it('should allow users to subscribe to the close event', function () {
    let _result: SkyConfirmCloseEventArgs;

    const config: SkyConfirmConfig = {
      message: 'dialog message',
      type: SkyConfirmType.YesCancel,
      buttons: [
        { text: 'yes' },
        { text: 'cancel' }
      ]
    };

    spyOn(modalService, 'open').and.returnValue(modalInstance);

    instance.open(modalService, config);

    instance.closed.subscribe((result: SkyConfirmCloseEventArgs) => {
      _result = result;
    });

    modalInstance.close({
      action: 'yes'
    });

    expect(_result.action).toEqual('yes');
  });

  it('should handle undefined closed args', function () {
    spyOn(modalService, 'open').and.returnValue(modalInstance);

    instance.open(modalService, {
      message: 'dialog message'
    });

    instance.closed.subscribe((result: SkyConfirmCloseEventArgs) => {
      expect(result.action).toEqual('cancel');
    });

    modalInstance.close();
  });
});
