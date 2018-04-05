import { TestBed } from '@angular/core/testing';

import {
  expect
} from '@blackbaud/skyux-builder/runtime/testing/browser';

import { SkyWindowRefService } from '../window';
import { ErrorModalConfig } from './error-modal-config';
import { SkyModalInstance } from '../modal/modal-instance';
import { SkyModalModule } from '../modal/modal.module';
import { SkyErrorModalFormComponent } from './error-modal-form.component';
import { SkyModalHostService } from '../modal/modal-host.service';
import { SkyModalConfiguration } from '../modal/modal-configuration';
import { MockHostService, SkyModalInstanceMock } from './fixtures/mocks';

describe('Error modal form component', () => {
  const mockWindowService = {
    getWindow(): any {
      return {
        setTimeout: (cb: Function) => cb()
      };
    }
  };

  const config: ErrorModalConfig = {
    errorTitle: 'Some error title',
    errorDescription: 'Description of error',
    errorCloseText: 'Close button text'
  };

  const modalInstance = new SkyModalInstanceMock();
  const mockHost = new MockHostService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyModalModule
      ],
      providers: [
        { provide: ErrorModalConfig, useValue: config },
        { provide: SkyModalInstance, useValue: modalInstance },
        { provide: SkyModalHostService, useValue: mockHost },
        { provide: SkyModalConfiguration, useValue: {} },
        { provide: SkyWindowRefService, useValue: mockWindowService }
      ]
    });
  });

  it('Title, description, and button text are displayed', () => {
    const fixture = TestBed.createComponent(SkyErrorModalFormComponent);

    let el = fixture.nativeElement;

    fixture.detectChanges();

    // check text
    const titleEl = el.querySelector('.sky-error-modal-title');
    const description = el.querySelector('.sky-error-modal-description');
    const buttonEl = el.querySelector('.sky-error-modal-close button');

    expect(titleEl).toExist();
    expect(description).toExist();
    expect(buttonEl).toExist();

    expect(titleEl).toHaveText('Some error title');
    expect(description).toHaveText('Description of error');
    expect(buttonEl).toHaveText('Close button text');
  });

  it('clicking close button invokes close method', () => {
    let fixture = TestBed.createComponent(SkyErrorModalFormComponent);

    let el = fixture.nativeElement;

    fixture.detectChanges();

    // test close method is called when clicked
    spyOn(modalInstance, 'close');
    const closeButtonEl = el.querySelector('.sky-error-modal-close button');
    closeButtonEl.click();
    expect(modalInstance.close).toHaveBeenCalled();
  });
});
