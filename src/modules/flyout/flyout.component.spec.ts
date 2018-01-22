import { ApplicationRef } from '@angular/core';
import {
  fakeAsync,
  inject,
  tick,
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

  it('should focus the dialog when no autofocus is inside of content', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    expect(document.activeElement).toEqual(getFlyout());
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
