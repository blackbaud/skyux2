import { SkyConfirmationDialogService } from './confirmation-dialog.service';
import { SkyConfirmationDialogConfig } from './confirmation-dialog-config';
import { MockModalService } from './fixtures/mocks';
import { SkyConfirmationDialogFormComponent } from './confirmation-dialog-form.component';

describe('Confirmation dialog service', () => {
  it('Test open is called with correct parameters', () => {
    let modalService = new MockModalService(undefined, undefined, undefined);

    const config: any = {
      description: 'dialog description',
      confirmText: 'accept',
      cancelText: 'cancel'
    };

    const expectedConfig = {
      providers: [{ provide: SkyConfirmationDialogConfig, useValue: config }]
    };

    let service = new SkyConfirmationDialogService(modalService);
    service.open(config);

    expect(modalService.openCalls.length).toBe(1);
    expect(modalService.openCalls[0].component).toBe(SkyConfirmationDialogFormComponent);
    expect(modalService.openCalls[0].config).toEqual(expectedConfig);
  });
});
