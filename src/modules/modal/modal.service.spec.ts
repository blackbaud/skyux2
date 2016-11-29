import {
  fakeAsync,
  inject,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect
} from '../testing';

import { BrowserModule } from '@angular/platform-browser';

import { SkyModalInstance } from './modal-instance';
import { SkyModalService } from './modal.service';
import { SkyModalModule } from './modal.module';

import { SkyModalFixturesModule } from './fixtures/modal-fixtures.module';
import { ModalTestValues } from './fixtures/modal-values.fixture';
import { ModalTestComponent } from './fixtures/modal.component.fixture';
import { ModalWithValuesTestComponent } from './fixtures/modal-with-values.component.fixture';

describe('Modal service', () => {
  let modalService: SkyModalService;

  function openModal(modalType: any, providers?: any[]) {
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
        BrowserModule,
        SkyModalModule,
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
        modalService.dispose();
      }
    )
  );

  it('should show a modal and return an instance that can then be closed', fakeAsync(() => {
    let modalInstance = openModal(ModalTestComponent);

    expect(document.body.querySelector('.sky-modal')).toExist();

    closeModal(modalInstance);

    expect(document.body.querySelector('.sky-modal')).not.toExist();
  }));

  it('should reuse the same modal host container for all modals', fakeAsync(() => {
    function validateModalCount(modalCount: number) {
      expect(document.body.querySelectorAll('sky-modal-host').length).toBe(1);

      expect(
        document.body.querySelectorAll('sky-modal-host sky-test-cmp').length
      ).toBe(modalCount);
    }

    let modalInstance1 = openModal(ModalTestComponent);

    validateModalCount(1);

    let modalInstance2 = openModal(ModalTestComponent);

    validateModalCount(2);

    closeModal(modalInstance1);
    closeModal(modalInstance2);

    validateModalCount(0);
  }));

  it('should allow data to be passed to the modal component when opened', fakeAsync(() => {
    let modalInstance = openModal(ModalWithValuesTestComponent, [
      {
        provide: ModalTestValues,
        useValue: {
          valueA: 'A'
        }
      }
    ]);

    expect(modalInstance.componentInstance.values.valueA).toBe('A');

    closeModal(modalInstance);
  }));
});
