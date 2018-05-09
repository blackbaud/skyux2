import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SkyToastInstance
} from '../../core';

@Component({
  selector: 'sky-toast-custom-demo',
  templateUrl: './toast-custom-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyToastCustomDemoComponent {
  constructor(
    private instance: SkyToastInstance
  ) { }

  public close(): void {
    this.instance.close();
  }
}
