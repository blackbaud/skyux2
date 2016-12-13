import {
  SkyModalInstance
} from './modal-instance';

import {
  SkyModalCloseArgs
} from './modal-close-args';

describe('Modal instance', () => {
  it('should not error if no close callback is specified', () => {
    let instance = new SkyModalInstance();

    instance.close();
  });

  it('should allow users to subscribe to the instanceClose event', function () {
    let instance = new SkyModalInstance();
    let expectedResult: SkyModalCloseArgs;

    instance.closed.subscribe((result: SkyModalCloseArgs) => {
      expectedResult = result;
    });

    instance.cancel('My result');

    expect(expectedResult.data).toBe('My result');
    expect(expectedResult.reason).toBe('cancel');

    instance.save('My data');
    expect(expectedResult.data).toBe('My data');
    expect(expectedResult.reason).toBe('save');

    instance.close('My close', 'reason');
    expect(expectedResult.data).toBe('My close');
    expect(expectedResult.reason).toBe('reason');

    instance.close('close data');
    expect(expectedResult.data).toBe('close data');
    expect(expectedResult.reason).toBe('close');
  });
});
