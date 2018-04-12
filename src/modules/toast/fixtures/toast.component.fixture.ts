import {
  Component
} from '@angular/core';

import {
  SkyToastConfig,
  SkyToastService
} from '../../toast';

import { SkyToastTestCustomComponent } from './toast-custom.component.fixture';

@Component({
  selector: 'sky-test-component',
  template: 'noop'
})
export class SkyToastTestComponent {
  constructor(
    private toastService: SkyToastService
  ) { }

  public openToast(options?: SkyToastConfig) {
    return this.toastService.openTemplatedMessage(SkyToastTestCustomComponent, options);
  }
}
