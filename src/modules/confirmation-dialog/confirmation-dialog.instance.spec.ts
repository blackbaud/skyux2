import { MockModalService } from './fixtures/mocks';
import { SkyConfirmationDialogInstance } from './confirmation-dialog.instance';
import { SkyConfirmationDialogType } from './confirmation-dialog-type';

describe('Confirmation dialog instance', () => {
  it('should allow users to subscribe to the close event', function () {
    let confirmInstance = new SkyConfirmationDialogInstance();
    let modalService = new MockModalService(undefined, undefined, undefined);
    let expectedResult: string;

    const config: any = {
      description: 'dialog description',
      type: SkyConfirmationDialogType.YesCancelDialog,
      buttonText: [{ text: 'yes' }, { text: 'cancel' }]
    };

    confirmInstance.open(modalService, config);

    confirmInstance.closed.subscribe((result: string) => {
      expectedResult = result;
    });

    confirmInstance.modalInstance.close('yes');

    expect(expectedResult).toBe('yes');
  });
});
