import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SkyToastService,
  SkyToastInstance
} from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-test-cmp-toast',
  templateUrl: './toast-demo.component.html',
  providers: [SkyToastService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastDemoComponent {
  constructor(
    public message: SkyToastInstance
  ) {}
}
