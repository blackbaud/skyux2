import { SkyErrorModalService } from './error-modal.service';
import { MockModalService } from './fixtures/mocks';
import { ErrorModalConfig } from './error-modal-config';
import { SkyErrorModalFormComponent } from './error-modal-form.component';

describe('Error modal service', () => {
  it('Test open is called with correct parameters', () => {
    let modalService = new MockModalService(undefined, undefined, undefined);

    const config: ErrorModalConfig = {
      errorTitle: 'Error title',
      errorDescription: 'Description of error',
      errorCloseText: 'Close button text'
    };

    const expectedProvider = { provide: ErrorModalConfig, useValue: config };

    let service = new SkyErrorModalService(modalService);
    service.open(config);

    expect(modalService.openCalls.length).toBe(1);
    expect(modalService.openCalls[0].component).toBe(SkyErrorModalFormComponent);
    expect(modalService.openCalls[0].providers).toEqual([expectedProvider]);
  });
});
