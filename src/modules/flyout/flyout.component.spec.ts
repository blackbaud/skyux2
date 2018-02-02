import {
  fakeAsync,
  inject,
  tick,
  TestBed
} from '@angular/core/testing';
import { ApplicationRef } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { expect } from '../testing';
import { FlyoutTestComponent } from './fixtures/flyout.component.fixture';
import { FlyoutAutofocusTestComponent } from './fixtures/flyout-autofocus.component.fixture';
import { FlyoutWithHelpWidgetTestComponent } from './fixtures/flyout-with-help-widget.component.fixture';
import { SkyFlyoutFixturesModule } from './fixtures/flyout-fixtures.module';
import { SkyFlyoutService } from './index';

describe('Flyout component', () => {
  let applicationRef: ApplicationRef;
  let flyoutService: SkyFlyoutService;

  function openFlyout(flyoutType: any, config?: Object) {
    const flyoutInstance = flyoutService.open(flyoutType, config);

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

  function getAutofocusElement(): any {
    return document.querySelector('#autofocus-el');
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

  it('should set focus on the flyout when no autofocus element is present', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    expect(document.activeElement).toEqual(getFlyout());
    flyoutService.close();
  }));

  it('should set focus on the autofocus element, if there is one present', fakeAsync(() => {
    openFlyout(FlyoutAutofocusTestComponent);
    expect(document.activeElement).toEqual(getAutofocusElement());
    flyoutService.close();
  }));

  it('should not have the sky-flyout-help-shim class if the help widget is not present', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    applicationRef.tick();
    expect(getFlyoutHeader().classList.contains('sky-flyout-help-shim')).toBeFalsy();
    flyoutService.close();
  }));

  it('should have the sky-flyout-help-shim class if the help widget is present', fakeAsync(() => {
    openFlyout(FlyoutWithHelpWidgetTestComponent);
    applicationRef.tick();
    expect(getFlyoutHeader().classList.contains('sky-flyout-help-shim')).toBeTruthy();
    flyoutService.close();
  }));

  it('should handle escape key press and close the flyout', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    applicationRef.tick();

    expect(getFlyout()).toExist();

    const escapeEvent: any = document.createEvent('CustomEvent');
    escapeEvent.which = 27;
    escapeEvent.keyCode = 27;
    escapeEvent.initEvent('keydown', true, true);
    document.dispatchEvent(escapeEvent);

    applicationRef.tick();
    tick();
    expect(getFlyout()).not.toExist();

    flyoutService.close();
  }));

  it('should close when the close button is clicked', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    applicationRef.tick();

    expect(getFlyout()).toExist();

    getFlyoutX().click();

    applicationRef.tick();
    tick();

    expect(getFlyout()).not.toExist();
  }));

  it('should accept configuration options for aria-labelledBy, aria-describedby and role',
    fakeAsync(() => {
      const expectedLabel = 'customlabelledby';
      const expectedDescribed = 'customdescribedby';
      const expectedRole = 'customrole';

      openFlyout(FlyoutTestComponent, {
        'ariaLabelledBy': expectedLabel,
        'ariaDescribedBy': expectedDescribed,
        'ariaRole': expectedRole
      });

      applicationRef.tick();
      tick();

      expect(document.querySelector('.sky-flyout').getAttribute('aria-labelledby'))
        .toBe(expectedLabel);
      expect(document.querySelector('.sky-flyout').getAttribute('aria-describedby'))
        .toBe(expectedDescribed);
      expect(document.querySelector('.sky-flyout').getAttribute('role'))
        .toBe(expectedRole);

      flyoutService.close();
    }));
});
