import { Type } from '@angular/core';
import {
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect
} from '../testing';

import { SkyModalInstance } from './modal-instance';
import { SkyModalService } from './modal.service';

import { SkyModalFixturesModule } from './fixtures/modal-fixtures.module';
import { ModalTestComponent } from './fixtures/modal.component.fixture';

fdescribe('Modal component', () => {
  let modalService: SkyModalService;

  function openModal(modalType: Type, providers?: any[]) {
    let modalInstance = modalService.open(modalType, providers);

    tick();

    return modalInstance;
  }

  function closeModal(modalInstance: SkyModalInstance) {
    modalInstance.close();
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
        SkyModalService
      ],
      (
        _modalService: SkyModalService
      ) => {
        modalService = _modalService;
      }
    )
  );

  it('should render on top of previously-opened modals', fakeAsync(() => {
    let modalInstance1 = openModal(ModalTestComponent);
    let modalInstance2 = openModal(ModalTestComponent);

    let modalEls = document.querySelectorAll('.sky-modal');

    let zIndex1 = parseInt(getComputedStyle(modalEls[0]).zIndex, 10);
    let zIndex2 = parseInt(getComputedStyle(modalEls[1]).zIndex, 10);

    console.log(getComputedStyle(modalEls[0]).zIndex);

    expect(zIndex2).toBeGreaterThan(zIndex1);

    // closeModal(modalInstance2);
    // closeModal(modalInstance1);
  }));
});
