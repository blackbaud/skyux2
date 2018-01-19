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

// import { SkyFlyoutInstance } from './flyout-instance';
import { SkyFlyoutService } from './flyout.service';

import { SkyFlyoutFixturesModule } from './fixtures/flyout-fixtures.module';
import { FlyoutTestComponent } from './fixtures/flyout.component.fixture';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { TestUtility } from '../testing/testutility';

// import { SkyFlyoutAdapterService } from './flyout-adapter.service';

describe('Flyout component', () => {
  let applicationRef: ApplicationRef;
  let flyoutService: SkyFlyoutService;

  function openFlyout(flyoutType: any, config?: Object) {
    let flyoutInstance = flyoutService.open(flyoutType, config);

    applicationRef.tick();

    return flyoutInstance;
  }

  // function closeFlyout(flyoutInstance: SkyFlyoutInstance) {
  //   flyoutInstance.close();
  //   tick();
  //   applicationRef.tick();
  // }

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

  // it('should focus the dialog when no autofocus is inside of content', fakeAsync(() => {
  //   let modalInstance1 = openFlyout(FlyoutTestComponent);
  //   expect(document.activeElement).toEqual(document.querySelector('.sky-modal-dialog'));
  //   closeFlyout(modalInstance1);
  // }));

  // it('should focus the autofocus element when autofocus is inside of content', fakeAsync(() => {
  //   let modalInstance1 = openFlyout(ModalAutofocusTestComponent);
  //   expect(document.activeElement).toEqual(document.querySelector('#autofocus-el'));
  //   closeFlyout(modalInstance1);
  // }));

  it('should handle escape key press and close the flyout', fakeAsync(() => {
    openFlyout(FlyoutTestComponent);
    tick();

    expect(document.querySelector('.sky-flyout')).toExist();

    let escapeEvent: any = document.createEvent('CustomEvent');
    escapeEvent.which = 27;
    escapeEvent.keyCode = 27;
    escapeEvent.initEvent('keyup', true, true);

    document.dispatchEvent(escapeEvent);

    tick();
    applicationRef.tick();

    expect(document.querySelector('.sky-flyout')).not.toExist();

  }));

  it('should close when the close button is clicked', ((done) => {
    let flyoutInstance = openFlyout(FlyoutTestComponent);

    applicationRef.tick();

    expect(document.querySelector('.sky-flyout')).toExist();

    flyoutInstance.closed.subscribe(() => {
      setTimeout(() => {
        expect(document.body.querySelector('.sky-flyout')).not.toExist();
        done();
      }, 10);
    });

    (<any>document.querySelector('.sky-flyout-btn-close')).click();

    applicationRef.tick();
  }));

  // it('should handle tab with shift when focus is on modal and in top modal', fakeAsync(() => {
  //   let modalInstance1 = openFlyout(ModalFooterTestComponent);
  //   let tabEvent: any = document.createEvent('CustomEvent');
  //   tabEvent.which = 9;
  //   tabEvent.keyCode = 9;
  //   tabEvent.shiftKey = true;
  //   tabEvent.initEvent('keydown', true, true);

  //   document.querySelector('.sky-modal-dialog').dispatchEvent(tabEvent);

  //   tick();
  //   applicationRef.tick();

  //   expect(document.activeElement).toEqual(document.querySelector('.sky-btn-primary'));

  //   closeFlyout(modalInstance1);
  // }));

  // it('should handle tab with shift when focus is in first item and in top modal', fakeAsync(() => {

  //   let modalInstance1 = openFlyout(ModalFooterTestComponent);

  //   let tabEvent: any = document.createEvent('CustomEvent');
  //   tabEvent.which = 9;
  //   tabEvent.keyCode = 9;
  //   tabEvent.shiftKey = true;
  //   tabEvent.initEvent('keydown', true, true);

  //   document.querySelector('.sky-modal-btn-close').dispatchEvent(tabEvent);

  //   tick();
  //   applicationRef.tick();

  //   expect(document.activeElement).toEqual(document.querySelector('.sky-btn-primary'));

  //   closeFlyout(modalInstance1);

  // }));

  // it('should handle tab when focus is in last item and in top modal', fakeAsync(() => {
  //   let modalInstance1 = openFlyout(ModalFooterTestComponent);

  //   let tabEvent: any = document.createEvent('CustomEvent');
  //   tabEvent.which = 9;
  //   tabEvent.keyCode = 9;
  //   tabEvent.shiftKey = false;
  //   tabEvent.initEvent('keydown', true, true);

  //   document.querySelector('.sky-btn-primary').dispatchEvent(tabEvent);

  //   tick();
  //   applicationRef.tick();

  //   expect(document.activeElement).toEqual(document.querySelector('.sky-modal-btn-close'));

  //   closeFlyout(modalInstance1);
  // }));

  // it('should handle tab in content when in top modal', fakeAsync(() => {
  //   let modalInstance1 = openFlyout(ModalFooterTestComponent);

  //   let tabEvent: any = document.createEvent('CustomEvent');
  //   tabEvent.which = 9;
  //   tabEvent.keyCode = 9;
  //   tabEvent.shiftKey = false;
  //   tabEvent.initEvent('keydown', true, true);

  //   document.querySelector('input').dispatchEvent(tabEvent);

  //   tick();
  //   applicationRef.tick();

  //   expect(document.activeElement).not.toEqual(document.querySelector('.sky-modal-btn-close'));

  //   closeFlyout(modalInstance1);
  // }));

  // it('should handle a different key code', fakeAsync(() => {
  //   let modalInstance1 = openFlyout(ModalFooterTestComponent);

  //   let tabEvent: any = document.createEvent('CustomEvent');
  //   tabEvent.which = 3;
  //   tabEvent.keyCode = 3;
  //   tabEvent.shiftKey = false;
  //   tabEvent.initEvent('keydown', true, true);

  //   document.querySelector('.sky-btn-primary').dispatchEvent(tabEvent);

  //   tick();
  //   applicationRef.tick();

  //   expect(document.activeElement).not.toEqual(document.querySelector('.sky-modal-btn-close'));

  //   closeFlyout(modalInstance1);
  // }));

  // it('handles no focusable elements', fakeAsync(() => {
  //   let modalInstance1 = openFlyout(ModalNoHeaderTestComponent);

  //   let tabEvent: any = document.createEvent('CustomEvent');
  //   tabEvent.which = 9;
  //   tabEvent.keyCode = 9;
  //   tabEvent.shiftKey = false;
  //   tabEvent.initEvent('keydown', true, true);

  //   document.dispatchEvent(tabEvent);

  //   tick();
  //   applicationRef.tick();

  //   expect(document.activeElement).not.toEqual(document.querySelector('.sky-modal-btn-close'));

  //   closeFlyout(modalInstance1);
  // }));

  // it('should handle empty list for focus first and last element functions', fakeAsync(() => {
  //   let adapterService = new SkyFlyoutAdapterService();
  //   let firstResult = adapterService.focusFirstElement([]);
  //   expect(firstResult).toBe(false);

  //   let lastResult = adapterService.focusLastElement([]);
  //   expect(lastResult).toBe(false);
  // }));


  // it('should set max height based on window and change when window resizes', fakeAsync(() => {
  //   let modalInstance = openFlyout(FlyoutTestComponent);
  //   let modalEl = document.querySelector('.sky-modal');
  //   let maxHeight = parseInt(getComputedStyle(modalEl).maxHeight, 10);
  //   let windowHeight = window.innerHeight;
  //   let contentEl = modalEl.querySelector('.sky-modal-content');

  //   let contentHeight = parseInt(getComputedStyle(contentEl).maxHeight, 10);

  //   expect(maxHeight).toEqual(windowHeight - 40);
  //   expect(contentHeight).toEqual(windowHeight - 40 - 114);

  //   TestUtility.fireDomEvent(window, 'resize');
  //   applicationRef.tick();
  //   maxHeight = parseInt(getComputedStyle(modalEl).maxHeight, 10);
  //   expect(maxHeight).toEqual(window.innerHeight - 40);

  //   closeFlyout(modalInstance);
  // }));

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
