import {
  Component
} from '@angular/core';

import { SkyToastMessage, SkyToastCustomComponent } from '..';

@Component({
  selector: 'sky-test-toast-sample',
  template: '<p>CustomToast</p>'
})
export class SkyToastTestCustomComponent implements SkyToastCustomComponent {
  constructor(
    public message: SkyToastMessage
  ) { }
}
