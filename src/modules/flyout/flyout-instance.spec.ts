import {
  SkyFlyoutInstance
} from './flyout-instance';

describe('Flyout instance', () => {

  it('should not error if no close callback is specified', () => {
    let instance = new SkyFlyoutInstance();

    instance.close();
  });

  it('should allow users to subscribe to the instance Closed event', function () {
    let instance: SkyFlyoutInstance;
    let callbackHit: boolean;

    instance = subscribeToClosed();
    instance.close();
    expect(callbackHit).toBeTruthy();

    function subscribeToClosed() {
      const flyoutInstance = new SkyFlyoutInstance();

      flyoutInstance.closed.subscribe(() => {
        callbackHit = true;
      });

      return flyoutInstance;
    }
  });

});
