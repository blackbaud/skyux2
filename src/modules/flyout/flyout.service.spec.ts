import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect
} from '../testing';

import {
  ApplicationRef
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { SkyFlyoutInstance } from './flyout-instance';
import { SkyFlyoutService } from './flyout.service';
import { SkyFlyoutModule } from './flyout.module';

import { SkyFlyoutFixturesModule } from './fixtures/flyout-fixtures.module';
import { FlyoutTestComponent } from './fixtures/flyout.component.fixture';
import { FlyoutWithValuesTestComponent } from './fixtures/flyout-with-values.component.fixture';
import { FlyoutTestValues } from './fixtures/flyout-values.fixture';

describe('Flyout service', () => {
  let flyoutService: SkyFlyoutService;
  let applicationRef: ApplicationRef;

  function openFlyout(modalType: any, config?: Object) {
    let flyoutInstance = flyoutService.open(modalType, config);

    tick();

    return flyoutInstance;
  }

  function closeFlyout(flyoutInstance: SkyFlyoutInstance) {
    flyoutInstance.close();
    tick();
    applicationRef.tick();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        SkyFlyoutModule,
        SkyFlyoutFixturesModule,
        NoopAnimationsModule
      ]
    });
  });

  beforeEach(
    inject(
      [
        SkyFlyoutService,
        ApplicationRef
      ],
      (
        _flyoutService: SkyFlyoutService,
        _applicationRef: ApplicationRef
      ) => {
        flyoutService = _flyoutService;
        flyoutService.close();
        applicationRef = _applicationRef;
      }
    )
  );

  it('should show a flyout and return an instance that can then be closed',
  fakeAsync(inject([SkyFlyoutService], (theFlyoutService: SkyFlyoutService) => {
    flyoutService = theFlyoutService;
    let flyoutInstance = openFlyout(FlyoutTestComponent);
    applicationRef.tick();

    expect(document.body.querySelector('.sky-flyout')).toExist();
    closeFlyout(flyoutInstance);
    tick();
    applicationRef.tick();

    expect(document.body.querySelector('.sky-flyout')).not.toExist();
  })));

  it('should not show multiple flyouts', fakeAsync(() => {
    let flyoutInstance = openFlyout(FlyoutTestComponent);
    let flyoutInstance2 = openFlyout(FlyoutTestComponent);
    applicationRef.tick();

    expect(document.body.querySelector('.sky-flyout')).toExist();
    expect(document.body.querySelectorAll('.sky-flyout').length).toBe(1);
    closeFlyout(flyoutInstance);
    tick();
    applicationRef.tick();

    expect(document.body.querySelector('.sky-flyout')).toExist();
    expect(document.body.querySelectorAll('.sky-flyout').length).toBe(1);
    closeFlyout(flyoutInstance2);
    tick();
    applicationRef.tick();

    expect(document.body.querySelector('.sky-flyout')).not.toExist();
  }));

  it('should allow data to be passed to the modal component when opened', fakeAsync(() => {
    let modalInstance = openFlyout(FlyoutWithValuesTestComponent, [
      {
        provide: FlyoutTestValues,
        useValue: {
          valueA: 'A'
        }
      }
    ]);

    expect(modalInstance.componentInstance.values.valueA).toBe('A');

    closeFlyout(modalInstance);
  }));
});
