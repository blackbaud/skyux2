import { TestBed } from '@angular/core/testing';

import { expect } from '../testing';
import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyModalInstance } from '../modal/modal-instance';
import { SkyModalModule } from '../modal/modal.module';
import { SkyConfirmationDialogFormComponent } from './confirmation-dialog-form.component';
import { SkyModalHostService } from '../modal/modal-host.service';
import { SkyModalConfiguration } from '../modal/modal-configuration';
import { MockHostService, SkyModalInstanceMock } from './fixtures/mocks';

describe('Confirmation dialog form component', () => {
  const modalInstance = new SkyModalInstanceMock();
  const mockHost = new MockHostService();

  let configWithSpecifyingButtonText = function() {
    const config: any = {
      description: 'dialog description test',
      confirmText: 'accept test',
      cancelText: 'cancel test'
    };

    TestBed.configureTestingModule({
      imports: [
        SkyModalModule
      ],
      providers: [
        { provide: SkyConfirmationDialogConfig, useValue: config },
        { provide: SkyModalInstance, useValue: modalInstance },
        { provide: SkyModalHostService, useValue: mockHost },
        { provide: SkyModalConfiguration, useValue: {} }
      ]
    });
  };

  let configWithoutSpecifyingButtonText = function() {
    const config: any = {
      description: 'dialog description test'
    };

    TestBed.configureTestingModule({
      imports: [
        SkyModalModule
      ],
      providers: [
        { provide: SkyConfirmationDialogConfig, useValue: config },
        { provide: SkyModalInstance, useValue: modalInstance },
        { provide: SkyModalHostService, useValue: mockHost },
        { provide: SkyModalConfiguration, useValue: {} }
      ]
    });
  };

  it('Description, and specified button text are displayed', () => {
    configWithSpecifyingButtonText();

    const fixture = TestBed.createComponent(SkyConfirmationDialogFormComponent);

    let el = fixture.nativeElement;

    fixture.detectChanges();

    // check text
    const description = el.querySelector('.sky-confirmation-dialog-description');
    const acceptButtonEl = el.querySelector('.sky-confirmation-dialog-confirm');
    const cancelButtonEl = el.querySelector('.sky-confirmation-dialog-cancel');

    expect(description).toExist();
    expect(acceptButtonEl).toExist();
    expect(cancelButtonEl).toExist();

    expect(description).toHaveText('dialog description test');
    expect(acceptButtonEl).toHaveText('accept test');
    expect(cancelButtonEl).toHaveText('cancel test');
  });

  it('Description, and default button text are displayed', () => {
    configWithoutSpecifyingButtonText();

    const fixture = TestBed.createComponent(SkyConfirmationDialogFormComponent);

    let el = fixture.nativeElement;

    fixture.detectChanges();

    // check text
    const description = el.querySelector('.sky-confirmation-dialog-description');
    const acceptButtonEl = el.querySelector('.sky-confirmation-dialog-confirm');
    const cancelButtonEl = el.querySelector('.sky-confirmation-dialog-cancel');

    expect(description).toExist();
    expect(acceptButtonEl).toExist();
    expect(cancelButtonEl).toExist();

    expect(description).toHaveText('dialog description test');
    expect(acceptButtonEl).toHaveText('Yes');
    expect(cancelButtonEl).toHaveText('Cancel');
  });

  it('clicking confirm button invokes close method with reason confirm', () => {
    configWithSpecifyingButtonText();
    let fixture = TestBed.createComponent(SkyConfirmationDialogFormComponent);

    let el = fixture.nativeElement;

    fixture.detectChanges();

    // test close method is called when clicked
    spyOn(modalInstance, 'close');
    const closeButtonEl = el.querySelector('.sky-confirmation-dialog-confirm');
    closeButtonEl.click();
    expect(modalInstance.close).toHaveBeenCalled();
    expect(modalInstance.close).toHaveBeenCalledWith('confirm');
  });

  it('clicking cancel button invokes close method with reason cancel', () => {
    configWithSpecifyingButtonText();
    let fixture = TestBed.createComponent(SkyConfirmationDialogFormComponent);

    let el = fixture.nativeElement;

    fixture.detectChanges();

    // test close method is called when clicked
    spyOn(modalInstance, 'close');
    const closeButtonEl = el.querySelector('.sky-confirmation-dialog-cancel');
    closeButtonEl.click();
    expect(modalInstance.close).toHaveBeenCalled();
    expect(modalInstance.close).toHaveBeenCalledWith('cancel');
  });
});
