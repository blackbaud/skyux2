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
  public text = 'This is a templated message. It can even link you to ';

  constructor(
    public instance: SkyToastInstance
  ) {}
}
