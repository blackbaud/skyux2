import { ApplicationRef } from '@angular/core';
import {
  fakeAsync,
  inject,
  tick,
  TestBed
} from '@angular/core/testing';

import {
  Router
} from '@angular/router';

import {
  expect,
  SkyAppTestUtility
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import { SkyModalInstance } from './modal-instance';
import { SkyModalService } from './modal.service';

import { SkyModalFixturesModule } from './fixtures/modal-fixtures.module';
import { ModalTestComponent } from './fixtures/modal.component.fixture';
import { ModalAutofocusTestComponent } from './fixtures/modal-autofocus.component.fixture';
import { ModalFooterTestComponent } from './fixtures/modal-footer.component.fixture';

import { ModalNoHeaderTestComponent } from './fixtures/modal-no-header.component.fixture';
import { ModalTiledBodyTestComponent  } from './fixtures/modal-tiled-body.component.fixture';

import { SkyModalComponentAdapterService } from './modal-component-adapter.service';

describe('Modal component', () => {
  let applicationRef: ApplicationRef;
  let modalService: SkyModalService;
  let router: Router;

  function openModal(modalType: any, config?: Object) {
    let modalInstance = modalService.open(modalType, config);

    applicationRef.tick();
    tick();

    return modalInstance;
  }

  function closeModal(modalInstance: SkyModalInstance) {
    modalInstance.close();
    tick();
    applicationRef.tick();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyModalFixturesModule
      ]
    });
  });

  beforeEach(
    inject(
      [
        ApplicationRef,
        SkyModalService,
        Router
      ],
      (
        _applicationRef: ApplicationRef,
        _modalService: SkyModalService,
        _router: Router
      ) => {
        applicationRef = _applicationRef;
        modalService = _modalService;
        modalService.dispose();
        router = _router;
      }
    )
  );

  it('should render on top of previously-opened modals', fakeAsync(() => {
    let modalInstance1 = openModal(ModalTestComponent);
    let modalInstance2 = openModal(ModalTestComponent);

    let modalEls = document.querySelectorAll('.sky-modal');

    let zIndex1 = parseInt(getComputedStyle(modalEls[0]).zIndex, 10);
    let zIndex2 = parseInt(getComputedStyle(modalEls[1]).zIndex, 10);

    expect(zIndex2).toBeGreaterThan(zIndex1);

    closeModal(modalInstance2);
    closeModal(modalInstance1);
  }));

  it('should focus the dialog when no autofocus is inside of content', fakeAsync(() => {
    let modalInstance1 = openModal(ModalTestComponent);
    expect(document.activeElement).toEqual(document.querySelector('.sky-modal'));
    closeModal(modalInstance1);
  }));

  it('should focus the autofocus element when autofocus is inside of content', fakeAsync(() => {
    let modalInstance1 = openModal(ModalAutofocusTestComponent);
    expect(document.activeElement).toEqual(document.querySelector('#autofocus-el'));
    closeModal(modalInstance1);
  }));

  it('should handle escape key press when modal is the top modal', fakeAsync(() => {
    openModal(ModalFooterTestComponent);
    let escapeEvent: any = document.createEvent('CustomEvent');
    escapeEvent.which = 27;
    escapeEvent.keyCode = 27;
    escapeEvent.initEvent('keydown', true, true);

    document.dispatchEvent(escapeEvent);

    tick();
    applicationRef.tick();

    expect(document.querySelector('.sky-modal')).not.toExist();

  }));

  it('should handle tab with shift when focus is on modal and in top modal', fakeAsync(() => {
    let modalInstance1 = openModal(ModalFooterTestComponent);
    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = true;
    tabEvent.initEvent('keydown', true, true);

    document.querySelector('.sky-modal-dialog').dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).toEqual(document.querySelector('.sky-btn-primary'));

    closeModal(modalInstance1);
  }));

  it('should handle tab with shift when focus is in first item and in top modal', fakeAsync(() => {

    let modalInstance1 = openModal(ModalFooterTestComponent);

    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = true;
    tabEvent.initEvent('keydown', true, true);

    document.querySelector('.sky-modal-btn-close').dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).toEqual(document.querySelector('.sky-btn-primary'));

    closeModal(modalInstance1);

  }));

  it('should handle tab when focus is in last item and in top modal', fakeAsync(() => {
    let modalInstance1 = openModal(ModalFooterTestComponent);

    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = false;
    tabEvent.initEvent('keydown', true, true);

    document.querySelector('.sky-btn-primary').dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).toEqual(document.querySelector('.sky-modal-btn-close'));

    closeModal(modalInstance1);
  }));

  it('should handle tab in content when in top modal', fakeAsync(() => {
    let modalInstance1 = openModal(ModalFooterTestComponent);

    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = false;
    tabEvent.initEvent('keydown', true, true);

    document.querySelector('input').dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).not.toEqual(document.querySelector('.sky-modal-btn-close'));

    closeModal(modalInstance1);
  }));

  it('should handle tab when modals are stacked', fakeAsync(() => {
    let modalInstance2 = openModal(ModalAutofocusTestComponent);
    let modalInstance1 = openModal(ModalFooterTestComponent);

    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = false;
    tabEvent.initEvent('keydown', true, true);

    document.querySelector('.sky-btn-primary').dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).toEqual(document.querySelector('.sky-modal-btn-close'));

    closeModal(modalInstance1);
    closeModal(modalInstance2);
  }));

  it('should handle a different key code', fakeAsync(() => {
    let modalInstance1 = openModal(ModalFooterTestComponent);

    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 3;
    tabEvent.keyCode = 3;
    tabEvent.shiftKey = false;
    tabEvent.initEvent('keydown', true, true);

    document.querySelector('.sky-btn-primary').dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).not.toEqual(document.querySelector('.sky-modal-btn-close'));

    closeModal(modalInstance1);
  }));

  it('handles no focusable elements', fakeAsync(() => {
    let modalInstance1 = openModal(ModalNoHeaderTestComponent);

    let tabEvent: any = document.createEvent('CustomEvent');
    tabEvent.which = 9;
    tabEvent.keyCode = 9;
    tabEvent.shiftKey = false;
    tabEvent.initEvent('keydown', true, true);

    document.dispatchEvent(tabEvent);

    tick();
    applicationRef.tick();

    expect(document.activeElement).not.toEqual(document.querySelector('.sky-modal-btn-close'));

    closeModal(modalInstance1);
  }));

  it('should handle empty list for focus first and last element functions', fakeAsync(() => {
    let adapterService = new SkyModalComponentAdapterService();
    let firstResult = adapterService.focusFirstElement([]);
    expect(firstResult).toBe(false);

    let lastResult = adapterService.focusLastElement([]);
    expect(lastResult).toBe(false);
  }));

  it('should close when the close button is clicked', fakeAsync(() => {
    openModal(ModalTestComponent);

    expect(document.querySelector('.sky-modal')).toExist();

    (<any>document.querySelector('.sky-modal-btn-close')).click();

    expect(document.querySelector('.sky-modal')).not.toExist();

    applicationRef.tick();
  }));

  it('should close when the user navigates through history', fakeAsync(() => {
    openModal(ModalTestComponent);

    expect(document.querySelector('.sky-modal')).toExist();

    router.navigate(['/']);

    expect(document.querySelector('.sky-modal')).not.toExist();

    applicationRef.tick();
  }));

  it('should trigger the help modal when the help button is clicked', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent, { helpKey: 'default.html' });
    spyOn(modalInstance, 'openHelp').and.callThrough();

    expect(document.querySelector('.sky-modal')).toExist();

    (<any>document.querySelector('button[name="help-button"]')).click();

    expect(modalInstance.openHelp).toHaveBeenCalledWith('default.html');

    applicationRef.tick();

    closeModal(modalInstance);
  }));

  it('should set max height based on window and change when window resizes', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent);
    let modalEl = document.querySelector('.sky-modal');
    let maxHeight = parseInt(getComputedStyle(modalEl).maxHeight, 10);
    let windowHeight = window.innerHeight;
    let contentEl = modalEl.querySelector('.sky-modal-content');

    let contentHeight = parseInt(getComputedStyle(contentEl).maxHeight, 10);

    expect(maxHeight).toEqual(windowHeight - 40);
    expect(contentHeight).toEqual(windowHeight - 40 - 114);

    SkyAppTestUtility.fireDomEvent(window, 'resize');
    applicationRef.tick();
    maxHeight = parseInt(getComputedStyle(modalEl).maxHeight, 10);
    expect(maxHeight).toEqual(window.innerHeight - 40);

    closeModal(modalInstance);
  }));

  it('should be a full screen modal and scale when window resizes', fakeAsync(() => {

    let modalInstance = openModal(ModalTestComponent, {'fullPage': true});
    let modalEl = document.querySelector('.sky-modal-full-page');
    let height = parseInt(getComputedStyle(modalEl).height, 10);
    // innerHeight -2 is for IE Box Model Fix
    expect([window.innerHeight - 2, window.innerHeight]).toContain(height);
    SkyAppTestUtility.fireDomEvent(window, 'resize');
    applicationRef.tick();
    modalEl = document.querySelector('.sky-modal-full-page');
    height = parseInt(getComputedStyle(modalEl).height, 10);
    // innerHeight -2 is for IE Box Model Fix
    expect([window.innerHeight - 2, window.innerHeight]).toContain(height);

    closeModal(modalInstance);
  }));

  it('should not contain small,medium, or large classes in full size mode', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent, {'fullPage': true});

    expect(document.querySelector('.sky-modal-small')).not.toExist();
    expect(document.querySelector('.sky-modal-medium')).not.toExist();
    expect(document.querySelector('.sky-modal-large')).not.toExist();

    closeModal(modalInstance);
  }));

  it('should default to medium size', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent, {'fullPage': false});

    expect(document.querySelector('.sky-modal-small')).not.toExist();
    expect(document.querySelector('.sky-modal-medium')).toExist();
    expect(document.querySelector('.sky-modal-large')).not.toExist();

    closeModal(modalInstance);
  }));

  it('should respect medium config setting size', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent, {'fullPage': false, 'size': 'medium'});

    expect(document.querySelector('.sky-modal-small')).not.toExist();
    expect(document.querySelector('.sky-modal-medium')).toExist();
    expect(document.querySelector('.sky-modal-large')).not.toExist();

    closeModal(modalInstance);
  }));

  it('should respect small config setting size', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent, {'fullPage': false, 'size': 'small'});

    expect(document.querySelector('.sky-modal-small')).toExist();
    expect(document.querySelector('.sky-modal-medium')).not.toExist();
    expect(document.querySelector('.sky-modal-large')).not.toExist();

    closeModal(modalInstance);
  }));

  it('should respect large config setting size', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent, {'fullPage': false, 'size': 'large'});

    expect(document.querySelector('.sky-modal-small')).not.toExist();
    expect(document.querySelector('.sky-modal-medium')).not.toExist();
    expect(document.querySelector('.sky-modal-large')).toExist();

    closeModal(modalInstance);
  }));

  it('should default the aria-labelledby and aria-describedby', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent);

    expect(document.querySelector('.sky-modal-dialog').getAttribute('aria-labelledby')
      .indexOf('sky-modal-header-id-'))
      .not.toBe(-1);
    expect(document.querySelector('.sky-modal-dialog').getAttribute('aria-describedby')
      .indexOf('sky-modal-content-id-'))
      .not.toBe(-1);
    closeModal(modalInstance);
  }));

  it('should accept configuration options for aria-labelledBy and aria-describedby',
  fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent, {
      'ariaLabelledBy': 'customlabelledby',
      'ariaDescribedBy': 'customdescribedby'
    });

    expect(document.querySelector('.sky-modal-dialog').getAttribute('aria-labelledby'))
      .toBe('customlabelledby');
    expect(document.querySelector('.sky-modal-dialog').getAttribute('aria-describedby'))
      .toBe('customdescribedby');

    closeModal(modalInstance);

  }));

  it('should default to tiled modal false', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent, {'tiledBody': false});

    expect(document.querySelector('.sky-modal-tiled')).not.toExist();

    closeModal(modalInstance);
  }));

  it('should accept configuration options for tiledBody', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent, {
      'tiledBody': true
    });

    expect(document.querySelector('.sky-modal-tiled')).toExist();

    closeModal(modalInstance);
  }));

  it('should handle to tiledBody true', fakeAsync(() => {
    let modalInstance = openModal(ModalTiledBodyTestComponent);

    expect(document.querySelector('.sky-modal-tiled')).toExist();

    closeModal(modalInstance);
  }));
});
