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

import { SkyModalInstance } from './modal-instance';
import { SkyModalService } from './modal.service';

import { SkyModalFixturesModule } from './fixtures/modal-fixtures.module';
import { ModalTestComponent } from './fixtures/modal.component.fixture';

import { TestUtility } from '../testing/testutility';

describe('Modal component', () => {
  let applicationRef: ApplicationRef;
  let modalService: SkyModalService;

  function openModal(modalType: any, providers?: any[]) {
    let modalInstance = modalService.open(modalType, providers);

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
        SkyModalService
      ],
      (
        _applicationRef: ApplicationRef,
        _modalService: SkyModalService
      ) => {
        applicationRef = _applicationRef;
        modalService = _modalService;
        modalService.dispose();
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

  it('should close when the close button is clicked', fakeAsync(() => {
    openModal(ModalTestComponent);

    expect(document.querySelector('.sky-modal')).toExist();

    (<any>document.querySelector('.sky-modal-btn-close')).click();

    expect(document.querySelector('.sky-modal')).not.toExist();

    applicationRef.tick();
  }));

  it('should set max height based on window and change when window resizes', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent);
    let modalEl = document.querySelector('.sky-modal');
    let maxHeight = parseInt(getComputedStyle(modalEl).maxHeight, 10);
    let windowHeight = window.innerHeight;

    expect(maxHeight).toEqual(windowHeight - 40);


    TestUtility.fireDomEvent(window, 'resize');
    applicationRef.tick();
    maxHeight = parseInt(getComputedStyle(modalEl).maxHeight, 10);
    expect(maxHeight).toEqual(window.innerHeight - 40);

    closeModal(modalInstance);
  }));

});
