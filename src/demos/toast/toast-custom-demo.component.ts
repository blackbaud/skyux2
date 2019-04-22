import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  SkyToastInstance
} from '@skyux/toast';

import {
  SkyToastCustomDemoContext
} from './toast-custom-demo-context';

@Component({
  selector: 'sky-toast-custom-demo',
  templateUrl: './toast-custom-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyToastCustomDemoComponent {
  constructor(
    public context: SkyToastCustomDemoContext,
    private instance: SkyToastInstance
  ) { }

  public close(): void {
    this.instance.close();
  }
}
