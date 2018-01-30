import {
  SkyFlyoutInstance
} from './flyout-instance';
import { inject, TestBed } from '@angular/core/testing';
import { SkyFlyoutService, SkyFlyoutModule } from './index';
import { BrowserModule } from '@angular/platform-browser';

describe('Flyout instance', () => {

  let flyoutService: SkyFlyoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        SkyFlyoutModule
      ]
    });
  });

  beforeEach(
    inject(
      [
        SkyFlyoutService
      ],
      (
        _flyoutService: SkyFlyoutService
      ) => {
        flyoutService = _flyoutService;
        flyoutService.close();
      }
    )
  );

  it('should not error if no close callback is specified', () => {
    const instance = new SkyFlyoutInstance(flyoutService);

    instance.close();
  });

  it('should allow users to subscribe to the instance Closed event', function () {
    let instance: SkyFlyoutInstance;
    let callbackHit: boolean;

    instance = subscribeToClosed();
    instance.closed.emit();
    expect(callbackHit).toBeTruthy();

    function subscribeToClosed() {
      const flyoutInstance = new SkyFlyoutInstance(flyoutService);

      flyoutInstance.closed.subscribe(() => {
        callbackHit = true;
      });

      return flyoutInstance;
    }
  });

});
