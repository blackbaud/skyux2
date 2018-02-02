import {
  TestBed
} from '@angular/core/testing';

import {
  BrowserModule
} from '@angular/platform-browser';

import {
  SkyFlyoutInstance,
  SkyFlyoutModule
} from './index';

fdescribe('Flyout instance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        SkyFlyoutModule
      ]
    });
  });

  it('should not error if no close callback is specified', () => {
    const instance = new SkyFlyoutInstance();

    instance.close();
  });

  it('should allow users to subscribe to the instance Closed event', function () {
    let instance: SkyFlyoutInstance;
    let callbackHit: boolean;

    instance = subscribeToClosed();
    instance.closed.emit();
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
