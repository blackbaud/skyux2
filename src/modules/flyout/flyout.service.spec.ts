import {
  ApplicationRef
} from '@angular/core';
import {
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { setTimeout } from 'core-js/library/web/timers';

import {
  SkyFlyoutModule,
  SkyFlyoutService
} from './index';
import { expect } from '../testing';
import { SkyFlyoutFixturesModule } from './fixtures/flyout-fixtures.module';
import { FlyoutTestComponent } from './fixtures/flyout.component.fixture';
import { FlyoutTestValues } from './fixtures/flyout-values.fixture';
import { FlyoutWithValuesTestComponent } from './fixtures/flyout-with-values.component.fixture';

describe('Flyout service', () => {
  let flyoutService: SkyFlyoutService;
  let applicationRef: ApplicationRef;

  function openFlyout(flyoutType: any, config?: Object) {
    const flyoutInstance = flyoutService.open(flyoutType, config);

    applicationRef.tick();

    return flyoutInstance;
  }

  function closeFlyout() {
    flyoutService.close();
    applicationRef.tick();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        SkyFlyoutModule,
        SkyFlyoutFixturesModule,
        BrowserAnimationsModule
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
  fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    applicationRef.tick();

    expect(document.body.querySelector('.sky-flyout')).toExist();
    closeFlyout();
    tick();
    applicationRef.tick();

    expect(document.body.querySelector('.sky-flyout')).not.toExist();
  }));

  it('should not show multiple flyouts', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    openFlyout(FlyoutTestComponent);
    tick();

    expect(document.body.querySelector('.sky-flyout')).toExist();
    expect(document.body.querySelectorAll('.sky-flyout').length).toBe(1);
    tick();
    applicationRef.tick();

    expect(document.body.querySelector('.sky-flyout')).toExist();
    expect(document.body.querySelectorAll('.sky-flyout').length).toBe(1);
    tick();
    applicationRef.tick();

    closeFlyout();
    tick();
    applicationRef.tick();

    expect(document.body.querySelector('.sky-flyout')).not.toExist();
  }));

  it('should allow data to be passed to the modal component when opened', fakeAsync(() => {
    const flyoutInstance = openFlyout(FlyoutWithValuesTestComponent, {providers: [
      {
        provide: FlyoutTestValues,
        useValue: {
          valueA: 'A'
        }
      }
    ]});

    expect(flyoutInstance.componentInstance.values.valueA).toBe('A');

    closeFlyout();
  }));

  it('should close the host comopnent when the host component sends the closed event', (done) => {
    const flyoutInstance = openFlyout(FlyoutTestComponent);
    applicationRef.tick();

    expect(document.body.querySelector('.sky-flyout')).toExist();
    expect(document.body.querySelectorAll('.sky-flyout').length).toBe(1);

    flyoutInstance.closed.subscribe(() => {
      setTimeout(() => {
        expect(document.body.querySelector('.sky-flyout')).not.toExist();
        done();
      }, 10);
    });

    (document.body.querySelector('.sky-flyout-btn-close') as HTMLElement).click();
    applicationRef.tick();
  });

});
