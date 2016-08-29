import {
  SkyModalInstance
} from './modal-instance';

describe('Modal instance', () => {
  it('should not error if no close callback is specified', () => {
    let instance = new SkyModalInstance();

    instance.close();
  });
});
