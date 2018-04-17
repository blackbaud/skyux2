import { Component } from '@angular/core';
import { SkyToastService, SkyToastCustomComponent, SkyToastMessage } from '@blackbaud/skyux/dist/core';

@Component({
  selector: 'sky-test-cmp-toast',
  templateUrl: './toast-demo.component.html',
  providers: [SkyToastService]
})
export class ToastDemoComponent implements SkyToastCustomComponent {
  public message: SkyToastMessage;
}
