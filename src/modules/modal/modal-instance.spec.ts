import {
  SkyModalInstance
} from './modal-instance';

describe('Modal instance', () => {
  it('should not error if no close callback is specified', () => {
    let instance = new SkyModalInstance();

    instance.close();
  });

  it('should allow users to subscribe to the instanceClose event', function () {
    let instance = new SkyModalInstance();
    let expectedResult:string;

    instance.instanceClose.subscribe((result: any) => {
      expectedResult = result;
    });

    instance.close('My result');

    expect(expectedResult).toBe('My result');

  });
});
