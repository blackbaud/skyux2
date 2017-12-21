import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { expect } from '../testing';
import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyConfirmationDialogType } from './confirmation-dialog-type';
import { SkyModalInstance } from '../modal/modal-instance';
import { SkyModalModule } from '../modal/modal.module';
import { SkyConfirmationDialogModule } from './confirmation-dialog.module';
import { SkyConfirmationDialogComponent } from './confirmation-dialog.component';
import { SkyConfirmationDialogButton } from './confirmation-dialog-button';
import { SkyModalHostService } from '../modal/modal-host.service';
import { SkyModalConfiguration } from '../modal/modal-configuration';
import { MockHostService, SkyModalInstanceMock } from './fixtures/mocks';

describe('Confirmation dialog form component', () => {
  const modalInstance = new SkyModalInstanceMock();
  const mockHost = new MockHostService();
  let fixture: any;
  let nativeElement: any;
  let element: any;

  let configDialog = function(type: SkyConfirmationDialogType, buttons:
    Array<SkyConfirmationDialogButton>) {

    let config = new SkyConfirmationDialogConfig();
    config = {
      message: 'dialog message test',
      type: type,
      buttons: buttons
    };

    TestBed.configureTestingModule({
      imports: [
        SkyModalModule,
        SkyConfirmationDialogModule
      ],
      providers: [
        { provide: SkyConfirmationDialogConfig, useValue: config },
        { provide: SkyModalInstance, useValue: modalInstance },
        { provide: SkyModalHostService, useValue: mockHost },
        { provide: SkyModalConfiguration, useValue: {} }
      ]
    });

    fixture = TestBed.createComponent(SkyConfirmationDialogComponent);
    nativeElement = fixture.nativeElement;
    element = fixture.debugElement;
    fixture.detectChanges();
  };

  it('should display default text for OK dialog', () => {
    configDialog(SkyConfirmationDialogType.OKDialog, undefined);

    // check text
    const message = nativeElement.querySelector('.sky-confirmation-dialog-message');
    const okButtonEl = nativeElement.querySelector('.sky-btn-primary');

    expect(message).toExist();
    expect(okButtonEl).toExist();

    expect(message).toHaveText('dialog message test');
    expect(okButtonEl).toHaveText('OK');
    expect(element.queryAll(By.css('.sky-confirmation-dialog-btn')).length).toBe(1);
  });

  it('should display custom text for OK dialog', () => {
    let button = new SkyConfirmationDialogButton();
    button.text = 'Custom Text 1';
    configDialog(SkyConfirmationDialogType.OKDialog, [ button ]);

    // check text
    const message = nativeElement.querySelector('.sky-confirmation-dialog-message');
    const okButtonEl = nativeElement.querySelector('.sky-btn-primary');

    expect(message).toExist();
    expect(okButtonEl).toExist();

    expect(message).toHaveText('dialog message test');
    expect(okButtonEl).toHaveText('Custom Text 1');
    expect(element.queryAll(By.css('.sky-confirmation-dialog-btn')).length).toBe(1);
  });

  it('should display default dialog when no button config is specified', () => {
    configDialog(undefined, undefined);

    // check text
    const message = nativeElement.querySelector('.sky-confirmation-dialog-message');
    const yesButtonEl = nativeElement.querySelector('.sky-btn-primary');
    const cancelButtonEl = nativeElement.querySelector('.sky-btn-link');

    expect(message).toExist();
    expect(yesButtonEl).toExist();
    expect(cancelButtonEl).toExist();

    expect(message).toHaveText('dialog message test');
    expect(yesButtonEl).toHaveText('Yes');
    expect(cancelButtonEl).toHaveText('Cancel');
    expect(element.queryAll(By.css('.sky-confirmation-dialog-btn')).length).toBe(2);
  });

  it('should display custom button text for yes cancel dialog', () => {
    configDialog(SkyConfirmationDialogType.YesCancelDialog, [ { text: 'Custom Text 1' },
      { text: 'Custom Text 2' } ]);

    // check text
    const message = nativeElement.querySelector('.sky-confirmation-dialog-message');
    const yesButtonEl = nativeElement.querySelector('.sky-btn-primary');
    const cancelButtonEl = nativeElement.querySelector('.sky-btn-link');

    expect(message).toExist();
    expect(yesButtonEl).toExist();
    expect(cancelButtonEl).toExist();

    expect(message).toHaveText('dialog message test');
    expect(yesButtonEl).toHaveText('Custom Text 1');
    expect(cancelButtonEl).toHaveText('Custom Text 2');
    expect(element.queryAll(By.css('.sky-confirmation-dialog-btn')).length).toBe(2);
  });

  it('should display custom second button text when partial button override is passed', () => {
    configDialog(SkyConfirmationDialogType.YesCancelDialog, [ undefined,
      { text: 'Custom Text 2' } ]);

    // check text
    const message = nativeElement.querySelector('.sky-confirmation-dialog-message');
    const yesButtonEl = nativeElement.querySelector('.sky-btn-primary');
    const cancelButtonEl = nativeElement.querySelector('.sky-btn-link');

    expect(message).toExist();
    expect(yesButtonEl).toExist();
    expect(cancelButtonEl).toExist();

    expect(message).toHaveText('dialog message test');
    expect(yesButtonEl).toHaveText('Yes');
    expect(cancelButtonEl).toHaveText('Custom Text 2');
    expect(element.queryAll(By.css('.sky-confirmation-dialog-btn')).length).toBe(2);
  });

  it('should display custom first button text when partial button override is passed', () => {
    configDialog(SkyConfirmationDialogType.YesCancelDialog, [ { text: 'Custom Text 1' } ]);

    // check text
    const message = nativeElement.querySelector('.sky-confirmation-dialog-message');
    const yesButtonEl = nativeElement.querySelector('.sky-btn-primary');
    const cancelButtonEl = nativeElement.querySelector('.sky-btn-link');

    expect(message).toExist();
    expect(yesButtonEl).toExist();
    expect(cancelButtonEl).toExist();

    expect(message).toHaveText('dialog message test');
    expect(yesButtonEl).toHaveText('Custom Text 1');
    expect(cancelButtonEl).toHaveText('Cancel');
    expect(element.queryAll(By.css('.sky-confirmation-dialog-btn')).length).toBe(2);
  });

  it('should display default button text for yes no cancel dialog', () => {
    configDialog(SkyConfirmationDialogType.YesNoCancelDialog, undefined);

    // check text
    const message = nativeElement.querySelector('.sky-confirmation-dialog-message');
    const yesButtonEl = nativeElement.querySelector('.sky-btn-primary');
    const noButtonEl = nativeElement.querySelector('.sky-btn-default');
    const cancelButtonEl = nativeElement.querySelector('.sky-btn-link');

    expect(message).toExist();
    expect(yesButtonEl).toExist();
    expect(noButtonEl).toExist();
    expect(cancelButtonEl).toExist();

    expect(message).toHaveText('dialog message test');
    expect(yesButtonEl).toHaveText('Yes');
    expect(noButtonEl).toHaveText('No');
    expect(cancelButtonEl).toHaveText('Cancel');
    expect(element.queryAll(By.css('.sky-confirmation-dialog-btn')).length).toBe(3);
  });

  it('should display custom button text for yes no cancel dialog', () => {
    configDialog(SkyConfirmationDialogType.YesNoCancelDialog, [ { text: 'Custom Text 1' },
      { text: 'Custom Text 2' }, { text: 'Custom Text 3' } ]);

    // check text
    const message = nativeElement.querySelector('.sky-confirmation-dialog-message');
    const yesButtonEl = nativeElement.querySelector('.sky-btn-primary');
    const noButtonEl = nativeElement.querySelector('.sky-btn-default');
    const cancelButtonEl = nativeElement.querySelector('.sky-btn-link');

    expect(message).toExist();
    expect(yesButtonEl).toExist();
    expect(noButtonEl).toExist();
    expect(cancelButtonEl).toExist();

    expect(message).toHaveText('dialog message test');
    expect(yesButtonEl).toHaveText('Custom Text 1');
    expect(noButtonEl).toHaveText('Custom Text 2');
    expect(cancelButtonEl).toHaveText('Custom Text 3');
    expect(element.queryAll(By.css('.sky-confirmation-dialog-btn')).length).toBe(3);
  });

  it('should invoke close method with button text as reason', () => {
    configDialog(SkyConfirmationDialogType.YesNoCancelDialog, undefined);

    // test close method is called when clicked
    spyOn(modalInstance, 'close');
    const yesButtonEl = nativeElement.querySelector('.sky-btn-primary');
    const noButtonEl = nativeElement.querySelector('.sky-btn-default');
    const cancelButtonEl = nativeElement.querySelector('.sky-btn-link');
    noButtonEl.click();
    expect(modalInstance.close).toHaveBeenCalled();
    expect(modalInstance.close).toHaveBeenCalledWith('No');
    yesButtonEl.click();
    expect(modalInstance.close).toHaveBeenCalledWith('Yes');
    cancelButtonEl.click();
    expect(modalInstance.close).toHaveBeenCalledWith('Cancel');
  });

  it('should autofocus first button when not specified in config', () => {
    configDialog(SkyConfirmationDialogType.YesNoCancelDialog, undefined);

    const buttonEl = nativeElement.querySelector('.sky-btn-primary');

    expect(buttonEl.hasAttribute('autofocus')).toEqual(true);
  });

  it('should autofocus specified button from config', () => {
    configDialog(SkyConfirmationDialogType.YesNoCancelDialog, [ undefined, undefined,
      { autofocus: true } ]);

    const buttonEl1 = nativeElement.querySelector('.sky-btn-primary');
    const buttonEl2 = nativeElement.querySelector('.sky-btn-link');

    expect(buttonEl1.hasAttribute('autofocus')).toEqual(false);
    expect(buttonEl2.hasAttribute('autofocus')).toEqual(true);
  });
});
