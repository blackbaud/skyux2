import { ApplicationRef, Type } from '@angular/core';

import {
  addProviders,
  ComponentFixture,
  fakeAsync,
  inject,
  TestComponentBuilder,
  tick
} from '@angular/core/testing';

import {
  expect,
  MockApplicationRef
} from '../testing';

import { SkyModalInstance } from './modal-instance';
import { SkyModalService } from './modal.service';
import { SkyModalAdapterService } from './modal-adapter.service';

import { ModalTestValues } from './fixtures/modal-values.fixture';
import { ModalTestComponent } from './fixtures/modal.component.fixture';
import { ModalWithValuesTestComponent } from './fixtures/modal-with-values.component.fixture';
import { MockSkyModalAdapterService } from './fixtures/mock-modal-adapter.service';
import { ModalHostContainerTestComponent } from './fixtures/modal-host-container.component.fixture';

describe('Modal service', () => {
  let modalService: SkyModalService;
  let tcb: TestComponentBuilder;
  let modalAdapter: MockSkyModalAdapterService;
  let hostFixture: ComponentFixture<ModalHostContainerTestComponent>;

  function openModal(modalType: Type, providers?: any[]) {
    let modalInstance = modalService.open(modalType, providers);

    hostFixture.detectChanges();

    tick();

    return modalInstance;
  }

  function closeModal(modalInstance: SkyModalInstance) {
    modalInstance.close();
    hostFixture.detectChanges();
  }

  beforeEach(() => {
    addProviders([
      SkyModalService,
      {
        provide: ApplicationRef,
        useClass: MockApplicationRef
      },
      {
        provide: SkyModalAdapterService,
        useClass: MockSkyModalAdapterService
      }
    ]);
  });

  beforeEach(
    inject(
      [
        TestComponentBuilder,
        SkyModalService,
        SkyModalAdapterService
      ],
      (
        _tcb: TestComponentBuilder,
        _modalService: SkyModalService,
        _modalAdapter: MockSkyModalAdapterService
      ) => {
        tcb = _tcb;
        modalService = _modalService;
        modalAdapter = _modalAdapter;
      }
    )
  );

  beforeEach(() => {
    hostFixture = tcb
      .overrideProviders(ModalHostContainerTestComponent, [
        {
          provide: SkyModalAdapterService,
          useValue: modalAdapter
        }
      ])
      .createSync(ModalHostContainerTestComponent);

    hostFixture.detectChanges();

    modalAdapter.hostViewContainer = hostFixture.componentInstance.viewContainerRef;
  });

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
