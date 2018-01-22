import { FlyoutWithHelpWidgetTestComponent } from './fixtures/flyout-with-help-widget.component.fixture';
import { FlyoutAutofocusTestComponent } from './fixtures/flyout-autofocus.component.fixture';
import { ApplicationRef } from '@angular/core';
import {
  fakeAsync,
  inject,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '../testing';

import { SkyFlyoutService } from './flyout.service';
import { SkyFlyoutFixturesModule } from './fixtures/flyout-fixtures.module';
import { FlyoutTestComponent } from './fixtures/flyout.component.fixture';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Flyout component', () => {
  let applicationRef: ApplicationRef;
  let flyoutService: SkyFlyoutService;

  function openFlyout(flyoutType: any, config?: Object) {
    let flyoutInstance = flyoutService.open(flyoutType, config);

    applicationRef.tick();

    return flyoutInstance;
  }

  function getFlyout(): any {
    return document.querySelector('.sky-flyout');
  }

  function getFlyoutHeader(): any {
    return document.querySelector('.sky-flyout-header');
  }

  function getAutofocusElement(): any {
    return document.querySelector('#autofocus-el');
  }

  function getCloseButton(): any {
    return document.querySelector('.sky-flyout-btn-close');
  }

  function closeFlyout() {
    getCloseButton().click();
    applicationRef.tick();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyFlyoutFixturesModule,
        BrowserAnimationsModule
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

  it('should set focus on the flyout when no autofocus element is present', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    expect(document.activeElement).toEqual(getFlyout());
    closeFlyout();
  }));

  it('should set focus on the autofocus element, if there is one present', ((done) => {
    openFlyout(FlyoutAutofocusTestComponent);
    setTimeout(() => {
      expect(document.activeElement).toEqual(getAutofocusElement());
      closeFlyout();
      done();
    }, 10);
  }));

  it('should not have the help-shim class if the help widget is not present', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    applicationRef.tick();
    expect(getFlyoutHeader().classList.contains('help-shim')).toBeFalsy();
    closeFlyout();
  }));

  it('should have the help-shim class if the help widget is present', fakeAsync(() => {
    openFlyout(FlyoutWithHelpWidgetTestComponent);
    applicationRef.tick();
    expect(getFlyoutHeader().classList.contains('help-shim')).toBeTruthy();
    closeFlyout();
  }));

  it('should handle escape key press and close the flyout', ((done) => {
    openFlyout(FlyoutTestComponent);
    applicationRef.tick();

    expect(getFlyout()).toExist();

    let escapeEvent: any = document.createEvent('CustomEvent');
    escapeEvent.which = 27;
    escapeEvent.keyCode = 27;
    escapeEvent.initEvent('keydown', true, true);
    document.dispatchEvent(escapeEvent);

    setTimeout(() => {
      expect(getFlyout()).not.toExist();
      done();
    }, 10);

  }));

  it('should close when the close button is clicked', ((done) => {
    let flyoutInstance = openFlyout(FlyoutTestComponent);
    applicationRef.tick();

    expect(getFlyout()).toExist();

    flyoutInstance.closed.subscribe(() => {
      setTimeout(() => {
        expect(getFlyout()).not.toExist();
        done();
      }, 10);
    });
    closeFlyout();
  }));

  it('should accept configuration options for aria-labelledBy, aria-describedby and role',
  fakeAsync(() => {
    let expectedLabel = 'customlabelledby';
    let expectedDescribed = 'customdescribedby';
    let expectedRole = 'customrole';

    openFlyout(FlyoutTestComponent, {
      'ariaLabelledBy': expectedLabel,
      'ariaDescribedBy': expectedDescribed,
      'ariaRole': expectedRole
    });

    expect(document.querySelector('.sky-flyout').getAttribute('aria-labelledby'))
      .toBe(expectedLabel);
    expect(document.querySelector('.sky-flyout').getAttribute('aria-describedby'))
      .toBe(expectedDescribed);
    expect(document.querySelector('.sky-flyout').getAttribute('role'))
      .toBe(expectedRole);

    closeFlyout();
  }));
});
