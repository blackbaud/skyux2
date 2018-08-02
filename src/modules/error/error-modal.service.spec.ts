import {
  MockModalService
} from './fixtures/mocks';
import {
  SkyErrorModalService
} from './error-modal.service';
import {
  ErrorModalConfig
} from './error-modal-config';
import {
  SkyErrorModalFormComponent
} from './error-modal-form.component';

import {
  SkyModalConfigurationInterface,
  SkyModalService
} from '../modal';

describe('Error modal service', () => {
  it('Test open is called with correct parameters', () => {
    let modalService = new MockModalService(undefined, undefined, undefined);

    const config: ErrorModalConfig = {
      errorTitle: 'Error title',
      errorDescription: 'Description of error',
      errorCloseText: 'Close button text'
    };

    const expectedProviders = [{ provide: ErrorModalConfig, useValue: config }];

    let service = new SkyErrorModalService(modalService as SkyModalService);
    service.open(config);

    expect(modalService.openCalls.length).toBe(1);
    expect(modalService.openCalls[0].component).toBe(SkyErrorModalFormComponent);

    // Uses the modalService Open overload that takes config
    // instead of providers (despite the property name)
    let modalConfig = modalService.openCalls[0].providers as SkyModalConfigurationInterface;
    expect(modalConfig.ariaRole).toBe('alertdialog');
    expect(modalConfig.providers).toEqual(expectedProviders);
  });
});
