import {
  ApplicationRef
} from '@angular/core';

import {
  fakeAsync,
  inject,
  tick,
  TestBed
} from '@angular/core/testing';

import {
  NoopAnimationsModule
} from '@angular/platform-browser/animations';

import {
  expect
} from '../testing';

import { FlyoutTestComponent } from './fixtures/flyout.component.fixture';
import { FlyoutAutofocusTestComponent } from './fixtures/flyout-autofocus.component.fixture';
import { FlyoutWithHelpWidgetTestComponent } from './fixtures/flyout-with-help-widget.component.fixture';
import { SkyFlyoutFixturesModule } from './fixtures/flyout-fixtures.module';

import {
  SkyFlyoutInstance,
  SkyFlyoutService
} from './index';

fdescribe('Flyout component', () => {
  let applicationRef: ApplicationRef;
  let flyoutService: SkyFlyoutService;

  function openFlyout(flyoutType: any, config?: Object): SkyFlyoutInstance {
    const flyoutInstance = flyoutService.launch(flyoutType, config);

    applicationRef.tick();
    tick();

    return flyoutInstance;
  }

  function getFlyout(): any {
    return document.querySelector('.sky-flyout');
  }

  function getFlyoutHeader(): any {
    return document.querySelector('.sky-flyout-header');
  }

  function getFlyoutX(): any {
    return document.querySelector('.sky-flyout-btn-close');
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyFlyoutFixturesModule,
        NoopAnimationsModule
      ]
    });
  });

  beforeEach(
    inject(
      [
        ApplicationRef,
        SkyFlyoutService
      ],
      (
        _applicationRef: ApplicationRef,
        _flyoutService: SkyFlyoutService
      ) => {
        applicationRef = _applicationRef;
        flyoutService = _flyoutService;
      }
    )
  );

  // Needed to ensure that the flyout cleans up after each test
  afterEach(() => {
    applicationRef.tick();
  });

  it('should not have the sky-flyout-help-shim class if the help widget is not present', fakeAsync(() => {
    const instance = openFlyout(FlyoutTestComponent);
    applicationRef.tick();
    expect(getFlyoutHeader().classList.contains('sky-flyout-help-shim')).toBeFalsy();
    instance.close();
  }));

  it('should have the sky-flyout-help-shim class if the help widget is present', fakeAsync(() => {
    const instance = openFlyout(FlyoutWithHelpWidgetTestComponent);
    applicationRef.tick();
    tick();
    expect(getFlyoutHeader().classList.contains('sky-flyout-help-shim')).toBeTruthy();
    instance.close();
  }));

  it('should close when the close button is clicked', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    applicationRef.tick();

    expect(getFlyout()).toExist();

    getFlyoutX().click();

    applicationRef.tick();
    tick();

    expect(document.querySelector('.sky-flyout-hidden')).toBeTruthy();
  }));

  it('should accept configuration options for aria-labelledBy, aria-describedby and role',
    fakeAsync(() => {
      const expectedLabel = 'customlabelledby';
      const expectedDescribed = 'customdescribedby';
      const expectedRole = 'customrole';

      const instance = openFlyout(FlyoutTestComponent, {
        'ariaLabelledBy': expectedLabel,
        'ariaDescribedBy': expectedDescribed,
        'ariaRole': expectedRole
      });

      applicationRef.tick();
      tick();
      tick();

      const flyoutElement = getFlyout();
      console.log('flyout:', flyoutElement);
      expect(flyoutElement.getAttribute('aria-labelledby'))
        .toBe(expectedLabel);
      expect(flyoutElement.getAttribute('aria-describedby'))
        .toBe(expectedDescribed);
      expect(flyoutElement.getAttribute('role'))
        .toBe(expectedRole);

      instance.close();
    }));
});
