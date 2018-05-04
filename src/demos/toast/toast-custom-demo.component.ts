import {
  Component,
  OnInit,
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
export class SkyToastCustomDemoComponent implements OnInit {
  public text = 'This is a templated message. It can even link you to ';

  constructor(
    public message: SkyToastInstance
  ) {}

  public ngOnInit() {
    this.message.isClosing.subscribe(() => {
      this.text = 'Bye bye :D';
    });
  }
}
