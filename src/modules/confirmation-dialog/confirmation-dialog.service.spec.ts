import { SkyConfirmationDialogService } from './confirmation-dialog.service';
import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { SkyConfirmationDialogType } from './confirmation-dialog-type';
import { MockModalService } from './fixtures/mocks';
import { SkyConfirmationDialogComponent } from './confirmation-dialog.component';

describe('Confirmation dialog service', () => {
  it('should open confirmation dialog with correct parameters', () => {
    let modalService = new MockModalService(undefined, undefined, undefined);

    const config: SkyConfirmationDialogConfig = {
      message: 'dialog description',
      type: SkyConfirmationDialogType.YesCancelDialog,
      buttons: [{ text: 'yes' }, { text: 'cancel' }]
    };

    const expectedConfig = {
      providers: [{ provide: SkyConfirmationDialogConfig, useValue: config }]
    };

    let service = new SkyConfirmationDialogService(modalService);
    service.open(config);

    expect(modalService.openCalls.length).toBe(1);
    expect(modalService.openCalls[0].component).toBe(SkyConfirmationDialogComponent);
    expect(modalService.openCalls[0].config).toEqual(expectedConfig);
  });
});
