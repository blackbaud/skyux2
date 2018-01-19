import { FlyoutWithoutTabbableContent } from './fixtures/flyout-without-tabbable-content.component.fixture';
import { FlyoutAutofocusTestComponent } from './fixtures/flyout-autofocus.component.fixture';
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

  function getLastTabbableElement(): any {
    return document.querySelector('#last-tabbable-element');
  }

  function getFirstTabbableElement(): any {
    return document.querySelector('#first-tabbable-element');
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

  it('should focus the autofocus element when autofocus is inside of content', ((done) => {
    openFlyout(FlyoutAutofocusTestComponent);
    setTimeout(() => {
      expect(document.activeElement).toEqual(document.querySelector('#autofocus-el'));
      closeFlyout();
      done();
    }, 10);
  }));

  it('should handle escape key press and close the flyout', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    tick();

    expect(getFlyout()).toExist();

    let escapeEvent: any = document.createEvent('CustomEvent');
    escapeEvent.which = 27;
    escapeEvent.keyCode = 27;
    escapeEvent.initEvent('keyup', true, true);
    document.dispatchEvent(escapeEvent);
    tick();
    applicationRef.tick();

    expect(getFlyout()).not.toExist();
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

  it('should handle shift+tab when focus is on flyout', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = true;
    tabEvent.initEvent('keydown', true, true);

    getFlyout().dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).toEqual(getLastTabbableElement());

    closeFlyout();
  }));

  it('should handle shift+tab when focus is in first item', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = true;
    tabEvent.initEvent('keydown', true, true);

    getCloseButton().dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).toEqual(getLastTabbableElement());

    closeFlyout();
  }));

  it('should handle tab when focus is in last item', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = false;
    tabEvent.initEvent('keydown', true, true);

    getLastTabbableElement().dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).toEqual(getCloseButton());

    closeFlyout();
  }));

  it('should handle tab in content', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = false;
    tabEvent.initEvent('keydown', true, true);

    getFirstTabbableElement().dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).not.toEqual(getLastTabbableElement());

    closeFlyout();
  }));

  it('should handle a different key code', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 3;
    tabEvent.keyCode = 3;
    tabEvent.shiftKey = false;
    tabEvent.initEvent('keydown', true, true);

    getFirstTabbableElement().dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).not.toEqual(getCloseButton());

    closeFlyout();
  }));

  it('handles no focusable elements', fakeAsync(() => {
    openFlyout(FlyoutWithoutTabbableContent);

    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = false;
    tabEvent.initEvent('keydown', true, true);

    document.dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).not.toEqual(getCloseButton());

    closeFlyout();
  }));

  // it('should default the aria-labelledby and aria-describedby', fakeAsync(() => {
  //   let modalInstance = openFlyout(FlyoutTestComponent);

  //   expect(document.querySelector('.sky-modal-dialog').getAttribute('aria-labelledby')
  //     .indexOf('sky-modal-header-id-'))
  //     .not.toBe(-1);
  //   expect(document.querySelector('.sky-modal-dialog').getAttribute('aria-describedby')
  //     .indexOf('sky-modal-content-id-'))
  //     .not.toBe(-1);
  //   closeFlyout(modalInstance);
  // }));

  // it('should accept configuration options for aria-labelledBy and aria-describedby',
  // fakeAsync(() => {
  //   let modalInstance = openFlyout(FlyoutTestComponent, {
  //     'ariaLabelledBy': 'customlabelledby',
  //     'ariaDescribedBy': 'customdescribedby'
  //   });

  //   expect(document.querySelector('.sky-modal-dialog').getAttribute('aria-labelledby'))
  //     .toBe('customlabelledby');
  //   expect(document.querySelector('.sky-modal-dialog').getAttribute('aria-describedby'))
  //     .toBe('customdescribedby');

  //   closeFlyout(modalInstance);

  // }));
});
